<script>
	import { createStudent } from './lib/student'
	export let setState;
    export let classId;

	let description = '';

	function handleSubmit() {
		createStudent(classId, description)
		setState('list')
	}
	function handleCancel() {
		setState('list')
	}
</script>

<style>
	input { display: block; width: 500px; max-width: 100%; }
</style>

<h2>Criar estudante</h2>
<form on:submit={handleSubmit}>
	<label>Nome</label>
	<input bind:value={description}>

	<button style="margin-top: 10px" class="uk-button uk-button-primary uk-width-1-1" disabled={!description} type='submit'>
		Confirmar
	</button>
	<a 
		href="javascript:void(0);return false;"
		on:click={handleCancel}>
		<button style="margin-top: 10px" class="uk-button uk-button-danger uk-width-1-1">
			Cancelar
		</button>
	</a>
</form>
