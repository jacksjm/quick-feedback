<script>
    import { format } from './lib/timeago.js'
    import { fade } from 'svelte/transition'

    export let id
    export let description
    export let setTab
    export let setId

    function open() {
        setId(id)
        setTab(description)
    }
</script>

<div 
    in:fade
    class="uk-card uk-card-default uk-card-body uk-margin-bottom uk-card-hover"
    on:click={open}>
    <p>
        <span>{id}</span>
        <b>{description}</b> 
    </p>
</div>

<style>
    .uk-card:hover {
        cursor: pointer;
    }
</style>