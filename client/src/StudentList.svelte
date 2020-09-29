<script>
    import StudentCard from './StudentCard.svelte'
    import CreateStudent from './CreateStudent.svelte'
    import SearchIcon from './icons/SearchIcon.svelte'
    import AddIcon from './icons/AddIcon.svelte'
    import EmptyStateCard from './EmptyStateCard.svelte'
    import { getStudents, removeStudent } from './lib/student'

    export let id

    const debounceTimeout = 500
    const maxListSize = 50
    let Students
    let debounce
    let tab = 'list'
    let studentId = ''

    refreshStudents()
    async function refreshStudents() {
        Students = await getStudents(id)
    }
    async function searchStudents() {
        clearTimeout(debounce)
        debounce = setTimeout(() => { refreshStudents() }, debounceTimeout)
    }
    async function handleInsert() {
        setState('insert')
    }

    function setState(id) {
        tab = id
        refreshStudents()
    }
    function setId(value){
        studentId = value
    }
    async function handleGoBack() {
        setState('list')
    }
    async function handleDelete(){
        removeStudent(studentId)
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
    {#if !Students}
        <EmptyStateCard>Loading...</EmptyStateCard>
    {:else if Students.length === 0}
        <EmptyStateCard>
            Não existem Estudantes cadastrados, favor incluir um novo estudante
        </EmptyStateCard>
    {:else}
        {#each Students as Student (Student.id)}
            <StudentCard {...Student} setState={setState} setId={setId} />
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
        <h2>Estudante: {tab}</h2>
        <a 
            href="javascript:void(0);"
            on:click={handleDelete}>
            <button style="margin-top: 10px" class="uk-button uk-button-danger uk-width-1-1">
                Excluir Estudante
            </button>
        </a>
    </div>
{:else}
    <CreateStudent classId={id} setState={setState}/>
{/if}