<script setup>
    import { ref, onMounted } from 'vue'

</script>

<template>
    <main>
        <div class="main-container">
            <h1>Welcome to GuessMate</h1>
			<span class="description">Answer questions and let others guess the answer you have chosen.</span>
		</div>

		<div class="signed-in">
		</div>
    </main>
</template>

<style scoped>
    main {
		height:100%;
        display: flex;
		flex-direction: column;
        align-items: center;
		margin-top: 5%;
    }

    .main-container {
		height: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: space-evenly;
    }

	.card {
		height: 100%;
		min-height: 0;
		max-height: 120px;
	}
	
	.description {
		height: 100%;
		min-height: 0;
		max-height: 100px;
	}

	h1, span {
		text-align: center;
	}
	
</style>
