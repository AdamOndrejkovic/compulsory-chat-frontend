<template>
  <div class="intro">
    <Intro/>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import Intro from "@/components/Intro/Intro.vue";


export default defineComponent({
  components: {
    Intro,
  }
})
</script>
<style scoped>
.intro {
  position: relative;
  height: 85vh;
}

.intro:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  background-image: url("../assets/images/intro.jpg");
  opacity: 0.7;
  height: 100%;
}
</style>
