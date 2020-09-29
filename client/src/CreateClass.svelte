<script>
	import { createClass } from './lib/class'
	export let setTab;

	let description = '';

	function handleSubmit() {
		createClass(description)
		setTab('list')
	}
	function handleCancel() {
		setTab('list')
	}
</script>

<style>
	input { display: block; width: 500px; max-width: 100%; }
</style>

<h2>Criar classe</h2>
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
