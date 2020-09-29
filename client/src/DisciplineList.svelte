<script>
    import DisciplineCard from './DisciplineCard.svelte'
    import CreateDiscipline from './CreateDiscipline.svelte'
    import SearchIcon from './icons/SearchIcon.svelte'
    import AddIcon from './icons/AddIcon.svelte'
    import EmptyStateCard from './EmptyStateCard.svelte'
    import { getDisciplines, removeDiscipline } from './lib/discipline'
    import ActivitiesList from './ActivitiesList.svelte'
    
    export let id

    const debounceTimeout = 500
    const maxListSize = 50
    let Disciplines
    let debounce
    let tab = 'list'
    let disciplineId = ''

    refreshDisciplines()
    async function refreshDisciplines() {
        Disciplines = await getDisciplines(id)
    }
    async function searchDisciplines() {
        clearTimeout(debounce)
        debounce = setTimeout(() => { refreshDisciplines() }, debounceTimeout)
    }
    async function handleInsert() {
        setState('insert')
    }

    function setState(id) {
        tab = id
        refreshDisciplines()
    }
    function setId(value){
        disciplineId = value
    }
    async function handleGoBack() {
        setState('list')
    }
    async function handleDelete(){
        removeDiscipline(disciplineId)
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
    {#if !Disciplines}
        <EmptyStateCard>Loading...</EmptyStateCard>
    {:else if Disciplines.length === 0}
        <EmptyStateCard>
            Não existem Disciplinas cadastradas, favor incluir uma nova disciplina
        </EmptyStateCard>
    {:else}
        {#each Disciplines as Discipline (Discipline.id)}
            <DisciplineCard {...Discipline} setState={setState} setId={setId}/>
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
    <h2>Disciplina: {tab}</h2>
    <ActivitiesList id={disciplineId}/>
    <a 
        href="javascript:void(0);"
        on:click={handleDelete}>
        <button style="margin-top: 10px" class="uk-button uk-button-danger uk-width-1-1">
            Excluir Disciplina
        </button>
    </a>
{:else}
    <CreateDiscipline classId={id} setState={setState}/>
{/if}