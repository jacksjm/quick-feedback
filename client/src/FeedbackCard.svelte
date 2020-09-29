<script>
    import { format } from './lib/timeago.js'
    import { fade } from 'svelte/transition'

    export let student
    export let setState
    export let setFeedback
    export let Feedback

    function open() {
        setState(student.name)
        setFeedback(Feedback)
    }
</script>

<div 
    in:fade
    class="uk-card uk-card-default uk-card-body uk-margin-bottom uk-card-hover"
    on:click={open}>
    <p>
        <span>{Feedback.id}</span>
        <b>{student.name}</b> 
    </p>
</div>

<style>
    .uk-card:hover {
        cursor: pointer;
    }
</style>