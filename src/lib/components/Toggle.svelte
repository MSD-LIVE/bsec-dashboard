<script>

    let {
        label = '',
        isOn = $bindable(false),
    } = $props();

</script>

<div class="flex flex-col items-center">
    <label
        class="relative inline-flex cursor-pointer items-center"
    >
        <input
            id={label}
            type="checkbox"
            class="peer sr-only"
            bind:checked={isOn}
        />
        <label
            for={label}
            class="hidden"
        >
        </label>
        <div
            class="
                peer h-6 w-11 rounded-full border bg-slate-200 
                after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5
                after:rounded-full after:border after:border-gray-300 after:bg-white
                after:transition-all after:content-[''] peer-checked:bg-slate-800
                peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300
            "
        >
        </div>
    </label>
    <label
        for={label}
        class="cursor-pointer select-none"
    >
        {label}
    </label>
</div>
