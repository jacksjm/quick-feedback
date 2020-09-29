<script>
	import { createActivitie } from './lib/activities'
	export let setState;
    export let disciplineId;

    let description = '';
    let date = '';

	function handleSubmit() {
		createActivitie(disciplineId, date, description)
		setState('list')
	}
	function handleCancel() {
		setState('list')
	}
</script>

<style>
	input { display: block; width: 500px; max-width: 100%; }
</style>

<h2>Criar atividade</h2>
<form on:submit={handleSubmit}>
	<label>Descrição</label>
	<input bind:value={description}>
	<label>Data da Avaliação</label>
    <input type='date' bind:value={date}>

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
