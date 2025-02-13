<script>
    import Icon from "@iconify/svelte";
	import '../app.css';
    import { base } from '$app/paths';
    import msdLiveLogo from "$lib/img/MSD.LIVE.horiz.svg";
	let { children } = $props();

	const topNavItems = [
        'About',
        'Events',
        'Policies',
        'Metrics',
        'Acknowledgement',
    ];

    const bottomNavItems = [
        'Data Repository',
        'Computational Resources',
        'Projects',
        'Help',
    ];

</script>

<div
    class="
        w-full flex flex-row items-center justify-center px-4 py-2 bg-rose-700 rounded-b-sm shadow-sm
    "
>
    <span
        class="text-sm text-white"
    >
        This is just a DEMO, meant to help generate ideas on what you actually want!
    </span>
</div>

<div
    class="
        w-full px-16 py-4 bg-white
        flex flex-row items-center
    "
>
    <div class="h-12 overflow-hidden">
        <img
            src={msdLiveLogo}
            alt='MSDLIVE'
            class="h-full object-contain"
        />
    </div>
    <div class="h-12 flex flex-row ml-auto items-center gap-8">
        {#each topNavItems as item}
            <a href="" class="">
                {item}
            </a>
        {/each}
        <a href="" class="px-4 py-1 bg-gray-300 rounded-sm shadow text-xs font-semibold">
            user@domain.org
        </a>
    </div>
</div>


<div
    class="
        w-full bg-blue-900 text-white flex flex-row items-center px-16 py-5 gap-8
    "
>
    {#each bottomNavItems as item}
        <a href="" class="">
            {item}
        </a>
    {/each}
</div>

{@render children()}
