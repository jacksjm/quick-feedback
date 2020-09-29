<script>
    import FeedbackCard from './FeedbackCard.svelte'
    import UpdateFeedback from './UpdateFeedback.svelte'
    import SearchIcon from './icons/SearchIcon.svelte'
    import AddIcon from './icons/AddIcon.svelte'
    import EmptyStateCard from './EmptyStateCard.svelte'
    import { getFeedbacks } from './lib/feedback'

    export let id

    const debounceTimeout = 500
    const maxListSize = 50
    let Feedbacks
    let debounce
    let tab = 'list'
    let Feedback

    refreshFeedbacks()
    async function refreshFeedbacks() {
        Feedbacks = await getFeedbacks(id)
    }
    async function searchFeedbacks() {
        clearTimeout(debounce)
        debounce = setTimeout(() => { refreshFeedbacks() }, debounceTimeout)
    }
    async function handleInsert() {
        setState('update')
    }

    function setState(id) {
        tab = id
        refreshFeedbacks()
    }
    function setFeedback(value){
        Feedback = value
    }
    async function handleGoBack() {
        setState('list')
    }
</script>

{#if tab === 'list'}
    {#if !Feedbacks}
        <EmptyStateCard>Loading...</EmptyStateCard>
    {:else if Feedbacks.length === 0}
        <EmptyStateCard>
            Não existem Atividades cadastradas
        </EmptyStateCard>
    {:else}
        {#each Feedbacks as Feedback (Feedback.id)}
            <FeedbackCard {...Feedback} Feedback={Feedback} setState={setState} setFeedback={setFeedback} />
        {/each}
    {/if}
{:else}
    <div>
        <a 
            href="javascript:void(0);"
            on:click={handleGoBack}>
            <button style="margin-bottom: 10px" class="uk-button uk-button-default uk-width-1-1">
                Voltar
            </button>
        </a>
        <h2>Estudante: {tab}</h2>
        <UpdateFeedback Feedback={Feedback} setState={setState} />
    </div>
{/if}