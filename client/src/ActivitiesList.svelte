<script>
    import ActivitiesCard from './ActivitiesCard.svelte'
    import CreateActivities from './CreateActivities.svelte'
    import SearchIcon from './icons/SearchIcon.svelte'
    import AddIcon from './icons/AddIcon.svelte'
    import EmptyStateCard from './EmptyStateCard.svelte'
    import { getActivities, removeActivitie } from './lib/activities'
    import FeedbackList from './FeedbackList.svelte'
    
    export let id

    const debounceTimeout = 500
    const maxListSize = 50
    let Activities
    let debounce
    let tab = 'list'
    let activitieId = ''

    refreshActivities()
    async function refreshActivities() {
        Activities = await getActivities(id)
    }
    async function searchActivities() {
        clearTimeout(debounce)
        debounce = setTimeout(() => { refreshActivities() }, debounceTimeout)
    }
    async function handleInsert() {
        setState('insert')
    }

    function setState(id) {
        tab = id
        refreshActivities()
    }
    function setId(value){
        activitieId = value
    }
    async function handleGoBack() {
        setState('list')
    }
    async function handleDelete(){
        removeActivitie(activitieId)
        setState('list')
    }
</script>

{#if tab === 'list'}
    <a 
        href="javascript:void(0);"
        on:click={handleInsert}>
        <button style="margin-bottom: 10px" class="uk-button uk-button-primary uk-width-1-1">
            Incluir
        </button>
    </a>
    {#if !Activities}
        <EmptyStateCard>Loading...</EmptyStateCard>
    {:else if Activities.length === 0}
        <EmptyStateCard>
            Não existem Atividades cadastradas, favor incluir uma nova atividade
        </EmptyStateCard>
    {:else}
        {#each Activities as Activities (Activities.id)}
            <ActivitiesCard {...Activities} setState={setState} setId={setId}/>
        {/each}
    {/if}
{:else if tab !== 'insert'}
    <a 
        href="javascript:void(0);"
        on:click={handleGoBack}>
        <button style="margin-bottom: 10px" class="uk-button uk-button-default uk-width-1-1">
            Voltar
        </button>
    </a>
    <h2>Atividade: {tab}</h2>
    <FeedbackList id={activitieId}/>
    <a 
        href="javascript:void(0);"
        on:click={handleDelete}>
        <button style="margin-top: 10px" class="uk-button uk-button-danger uk-width-1-1">
            Excluir Atividade
        </button>
    </a>
{:else}
    <CreateActivities disciplineId={id} setState={setState}/>
{/if}