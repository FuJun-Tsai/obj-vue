<template>
  <router-view/>
</template>

<style lang="scss">
@import "./assets/all.scss";
img{
  width: 100%;
}
.border{
  border-radius: 12px !important;
  border: 1px solid var(--bs-primary) !important;
}
p{
  text-align: justify;
}
.text-primary{
    color: var(--bs-primary);
}
.back-primary{
  background: var(--bs-primary);
}
</style>
