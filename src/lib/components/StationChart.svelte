<script>

    import Icon from "@iconify/svelte";
    import * as Plot from "@observablehq/plot";
    import { asyncBufferFromUrl, parquetQuery } from 'hyparquet';
    import { snappyUncompressor } from 'hysnappy';
    import { parseDate } from "svelty-picker";
    import { en } from 'svelty-picker/i18n';
    import * as d3 from "d3";

    import { base } from '$app/paths';
    import ChartDetail from "./ChartDetail.svelte";

    const interval = d3.utcMinute.every(5);

    let {
        availableVariables = [],
        selectedStations = [],
        singleVariable = [],
        multiVariables = [],
        startDate,
        endDate,
    } = $props();

    let chartDiv = $state();
    let data = $state();
    let chart = $state();
    let selectedVariables = $state();
    let start = $state();
    let end = $state();
    let loading = $state(false);

    let selectedTime = $state();

    let chartWidth = $state();

    $effect(() => {
        if (selectedStations.length > 0) {
            if (selectedStations.length === 1) {
                selectedVariables = multiVariables.map(v => availableVariables.find(av => av.display === v));
            }
            else {
                selectedVariables = availableVariables.filter(v => singleVariable.includes(v.display));
            }
        }
    });

    $effect(() => {
        start      = parseDate(startDate, 'yyyy-mm-dd', en, 'standard');
        let tmpEnd = parseDate(endDate, 'yyyy-mm-dd', en, 'standard');
        tmpEnd.setHours(23, 59, 59);
        end = tmpEnd;
    });

    $effect(() => {
        data = undefined;
        chart = undefined;
        loading = true;
        if (start && end && (selectedStations.length > 0) && (selectedVariables.length > 0)) {
            const d = [];
            selectedStations.forEach((station) => {
                d.push(
                    asyncBufferFromUrl({ url: `${base}/data/${station}_5min_data.parquet` }).then(file => (
                        parquetQuery({
                            file,
                            compressors: { SNAPPY: snappyUncompressor() },
                            columns: ['stationID', 'obsTimeUtc', ...selectedVariables.map(v => v.variable)],
                            filter: {
                                'obsTimeUtc': {
                                    $gte: start,
                                    $lte: end,
                                },
                            }
                        })
                    ))
                );
            });
            Promise.all(d).then(d => {
                data = d.flat();
            }).finally(() => {
                loading = false;
            });
        }
    });

    $effect(() => {
        if (data && (selectedVariables.length > 0) && chartWidth) {
            if (selectedStations.length === 1) {
                // need a y axis for each unit type in variables
                const uniqueUnits = [...new Set(selectedVariables.map(v => v.units))];
                // find the total range for each axis and create a scales based on the first
                let firstExtent;
                const axesScales = uniqueUnits.map((u, i) => {
                    const unitVars = selectedVariables.filter(v => v.units === u);
                    const valueGetterMin = d => d3.min(unitVars.map(v => d[v.variable]));
                    const valueGetterMax = d => d3.max(unitVars.map(v => d[v.variable]));
                    const extent = [d3.min(data, valueGetterMin), d3.max(data, valueGetterMax)];
                    if (i===0) {
                        firstExtent = extent;
                    }
                    return d3.scaleLinear(extent, firstExtent);
                });
                chart = Plot.plot({
                    width: chartWidth,
                    height: 384,
                    marginRight: 30 * axesScales.length,
                    x: { label: '', domain: [start, end], grid: true, labelArrow: 'none', type: 'time', },
                    y: { axis: 'left', label: selectedVariables[0].units, grid: true, tickFormat: d3.format('~g') },
                    color: { legend: true },
                    marks: [
                        ...axesScales.slice(1).map((s, i) => Plot.axisY(s.ticks(), { anchor: 'right', label: uniqueUnits[i+1], y: s, tickFormat: d3.format('~g'), dx: i*40, labelOffset: 40 + i*40 })),
                        Plot.lineY(data, { x: 'obsTimeUtc', y: selectedVariables[0].variable, stroke: d => selectedVariables[0].display, interval }),
                        ...selectedVariables.slice(1).map((v, i) => Plot.lineY(data, Plot.mapY(d => d.map(axesScales[uniqueUnits.findIndex(u => u === v.units)]), { x: 'obsTimeUtc', y: v.variable, stroke: d => v.display, interval }))),
                        Plot.ruleX(data, Plot.pointerX({ x: 'obsTimeUtc', py: selectedVariables[0].variable, stroke: '#911364' })),
                    ],
                });
            }
            else if (selectedStations.length > 1) {
                chart = Plot.plot({
                    width: chartWidth,
                    height: 384,
                    marginLeft: 50,
                    x: { label: '', domain: [start, end], grid: true, labelArrow: 'none', type: 'time', },
                    y: { label: selectedVariables[0].units, grid: true, tickFormat: d3.format('~g') },
                    color: { legend: true },
                    marks: [
                        Plot.lineY(data, { x: 'obsTimeUtc', y: selectedVariables[0].variable, z: 'stationID', stroke: 'stationID', interval }),
                        Plot.ruleX(data, Plot.pointerX({ x: 'obsTimeUtc', py: selectedVariables[0].variable, stroke: '#911364' })),
                    ],
                });
            }
        }
        else {
            chart = undefined;
        }
    });

    $effect(() => {
        chartDiv?.firstChild?.remove();
        if (chart) {
            // render chart
            chartDiv?.append(chart);
            chart.addEventListener("input", event => {
                selectedTime = chart.value?.obsTimeUtc;
            });
        }
    });

</script>

<div
    class="w-full flex flex-col items-center gap-4"
>
    {#if loading}
        <Icon class="text-blue-600 mt-24" icon="line-md:downloading-loop" width=200 height=200 />
    {/if}
    <div bind:clientWidth={chartWidth} bind:this={chartDiv} role="img" class="w-full"></div>
    {#if data}
        <ChartDetail
            data={data}
            stations={selectedStations}
            timeslice={selectedTime}
            variables={selectedVariables}
        />
    {/if}
</div>
