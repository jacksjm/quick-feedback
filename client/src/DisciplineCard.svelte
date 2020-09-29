<script>
    import { format } from './lib/timeago.js'
    import { fade } from 'svelte/transition'

    export let id
    export let description
    export let setState
    export let setId

    function open() {
        setState(description)
        setId(id)
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