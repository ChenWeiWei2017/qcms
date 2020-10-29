<template>
  <q-drawer
    :value="collapse"
    show-if-above
    bordered
    content-class="bg-white"
    :width="280"
  >
    <q-scroll-area class="fit">
      <q-toolbar class="logo">
        <q-toolbar-title class="row items-center text-grey-8">
          <img src="@/assets/img/logo.png" />
        </q-toolbar-title>
      </q-toolbar>
      <q-list padding class="text-grey-8">
        <q-item
          class="cd__drawer-item"
          v-ripple
          v-for="link in links1"
          :key="link.text"
          clickable
          :active="active == link.text"
          @click="active = active == link.text ? active : link.text"
          active-class="active"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" />

        <q-item
          class="cd__drawer-item"
          v-ripple
          v-for="link in links2"
          :key="link.text"
          clickable
          :active="active == link.text"
          @click="active = active == link.text ? active : link.text"
          active-class="active"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" />

        <q-item
          class="cd__drawer-item"
          v-ripple
          v-for="link in links3"
          :key="link.text"
          clickable
        >
          <q-item-section>
            <q-item-label
              >{{ link.text }} <q-icon v-if="link.icon" :name="link.icon"
            /></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { fasGlobeAmericas, fasFlask } from "@quasar/extras/fontawesome-v5";
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapState({
      collapse: state => state.app.collapse
    })
  },
  data() {
    return {
      leftDrawerOpen: false,
      active: "Favourites",
      links1: [
        { icon: "web", text: "网站管理" },
        { icon: "person", text: "用户管理" },
        { icon: "star_border", text: "Favourites" },
        { icon: "search", text: "Saved searches" }
      ],
      links2: [
        { icon: "flag", text: "Canada" },
        { icon: fasGlobeAmericas, text: "World" },
        { icon: "place", text: "Local" },
        { icon: "domain", text: "Business" },
        { icon: "memory", text: "Technology" },
        { icon: "local_movies", text: "Entertainment" },
        { icon: "directions_bike", text: "Sports" },
        { icon: fasFlask, text: "Science" },
        { icon: "fitness_center", text: "Health " }
      ],
      links3: [
        { icon: "", text: "Language & region" },
        { icon: "", text: "Settings" },
        { icon: "open_in_new", text: "Get the Android app" },
        { icon: "open_in_new", text: "Get the iOS app" },
        { icon: "", text: "Send feedback" },
        { icon: "open_in_new", text: "Help" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.logo {
  height: 64px;

  img {
    padding-left: 4px;
  }
}

.q-item {
  &.active {
    background: #e6f1fc;

    .q-icon,
    .q-item__label {
      color: var(--q-color-primary);
    }
  }
}
</style>
