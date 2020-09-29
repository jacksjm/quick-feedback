<script>
	import { createDiscipline } from './lib/discipline'
	export let setState;
    export let classId;

	let description = '';

	function handleSubmit() {
		createDiscipline(classId, description)
		setState('list')
	}
	function handleCancel() {
		setState('list')
	}
</script>

<style>
	input { display: block; width: 500px; max-width: 100%; }
</style>

<h2>Criar disciplina</h2>
<form on:submit={handleSubmit}>
	<label>Descrição</label>
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
