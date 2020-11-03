<template>
  <q-page padding>
    <div class="row q-col-gutter-x-md">
      <div class="col-3">
        <q-card class="fill">
          <q-card-section>
            <div class="text-h6">部门总览</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-tree :nodes="simple" node-key="label" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-9">
        123
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Department",
  data() {
    return {
      text: "",
      simple: [
        {
          label: "Satisfied customers (with avatar)",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          children: [
            {
              label: "Good food (with icon)",
              icon: "restaurant_menu",
              children: [
                { label: "Quality ingredients" },
                { label: "Good recipe" }
              ]
            },
            {
              label: "Good service (disabled node with icon)",
              icon: "room_service",
              disabled: true,
              children: [
                { label: "Prompt attention" },
                { label: "Professional waiter" }
              ]
            },
            {
              label: "Pleasant surroundings (with icon)",
              icon: "photo",
              children: [
                {
                  label: "Happy atmosphere (with image)",
                  img: "https://cdn.quasar.dev/img/logo_calendar_128px.png"
                },
                { label: "Good table presentation" },
                { label: "Pleasing decor" }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.row {
  height: 100%;
}
</style>
