<script>
    import ClassCard from './ClassCard.svelte'
    import CreateClass from './CreateClass.svelte'
    import SearchIcon from './icons/SearchIcon.svelte'
    import AddIcon from './icons/AddIcon.svelte'
    import EmptyStateCard from './EmptyStateCard.svelte'
    import { getClasses, removeClass } from './lib/class'
    import DisciplineList from './DisciplineList.svelte'
    import StudentList from './StudentList.svelte'

    const debounceTimeout = 500
    const maxListSize = 50
    let Classes
    let debounce
    let search = ''
    let tab = 'list'
    let id = ''

    refreshClasses()
    async function refreshClasses() {
        Classes = await getClasses(search)
    }
    async function searchClasses() {
        clearTimeout(debounce)
        debounce = setTimeout(() => { refreshClasses() }, debounceTimeout)
    }
    async function handleInsert() {
        setTab('insert')
    }
    function setTab(id) {
        tab = id
        refreshClasses()
    }
    function setId(value){
        id = value
    }
    async function handleGoBack() {
        setTab('list')
    }
    async function handleDelete(){
        removeClass(id)
        setTab('list') 
    }
</script>

{#if tab === 'list'}

    <div class="uk-margin uk-inline">
        <SearchIcon />
        <input
            class="uk-input uk-form-width-medium"
            bind:value={search}
            on:input={searchClasses}/>
    </div>
    <a 
        href="javascript:void(0);"
        on:click={handleInsert}>
        <button style="margin-bottom: 10px" class="uk-button uk-button-primary uk-width-1-1">
            Incluir
        </button>
    </a>

    {#if !Classes}
        <EmptyStateCard>Loading...</EmptyStateCard>
    {:else if Classes.length === 0}
        <EmptyStateCard>
            Não existem Classes cadastradas, favor incluir uma nova classe
        </EmptyStateCard>
    {:else}
        {#each Classes as Class (Class.id)}
            <ClassCard {...Class} setTab={setTab} setId={setId}/>
        {/each}
    {/if}
{:else if tab !== 'insert'}
    <div>
        <a 
            href="javascript:void(0);"
            on:click={handleGoBack}>
            <button style="margin-bottom: 10px" class="uk-button uk-button-default uk-width-1-1">
                Voltar
            </button>
        </a>
        <h2>Classe - {tab}</h2>
        <h2>Estudantes</h2>
        <StudentList id={id} />
        <h2>Disciplinas</h2>
        <DisciplineList id={id} />
        <a 
            href="javascript:void(0);"
            on:click={handleDelete}>
            <button style="margin-top: 10px; margin-bottom: 10px" class="uk-button uk-button-danger uk-width-1-1">
                Excluir Classe
            </button>
        </a>
    </div>
{:else}
    <CreateClass setTab={setTab}/>
{/if}