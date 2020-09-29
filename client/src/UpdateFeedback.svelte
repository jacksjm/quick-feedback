<script>
	import { updateFeedback } from './lib/feedback'
	export let setState;
    export let Feedback;

	let date = new Date(Feedback.date).toISOString().substr(0, 10)

	console.log(Feedback.date)
	function handleSubmit() {
        updateFeedback({ ...Feedback, date })
		setState('list')
	}
	function handleCancel() {
		setState('list')
	}
</script>

<style>
	input { display: block; width: 500px; max-width: 100%; }
</style>

<h2>Realizar Feedback</h2>
<form>
	<label>Data do Feedback</label>
	<input type='date' bind:value={date}>
	<label>Avaliação</label>
    <input bind:value={Feedback.evaluation}>
	<label>Feedback</label>
    <input bind:value={Feedback.feedback}>
	<label>Oportunidade de Recuperação</label>
    <input type='textarea' bind:value={Feedback.oportunite}>

	<a 
		href="javascript:void(0);return false;"
		on:click={handleSubmit}>
		<button style="margin-top: 10px" class="uk-button uk-button-primary uk-width-1-1" disabled={!Feedback.evaluation && !Feedback.date}>
			Confirmar
		</button>
	</a>
	<a 
		href="javascript:void(0);return false;"
		on:click={handleCancel}>
		<button style="margin-top: 10px" class="uk-button uk-button-danger uk-width-1-1">
			Cancelar
		</button>
	</a>
</form>
