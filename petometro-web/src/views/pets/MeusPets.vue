<template>
  <div
    fill-height
    fluid
    grid-list-sm
  >
    <v-spacer/>
    <v-layout wrap>
      <v-flex
        v-for="n in 10"
        :key="n"
        lg4
        md6
        xs12
        sm12>
        <material-pet-card/>
      </v-flex>
    </v-layout>
  </div>
</template>