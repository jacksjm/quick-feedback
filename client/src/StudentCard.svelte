<script>
    import { format } from './lib/timeago.js'
    import { fade } from 'svelte/transition'

    export let id
    export let name
    export let setState
    export let setId

    function open() {
        setState(name)
        setId(id)
    }
</script>

<div 
    in:fade
    class="uk-card uk-card-default uk-card-body uk-margin-bottom uk-card-hover"
    on:click={open}>
    <p>
        <span>{id}</span>
        <b>{name}</b> 
    </p>
</div>

<style>
    .uk-card:hover {
        cursor: pointer;
    }
</style>