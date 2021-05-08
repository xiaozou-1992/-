<template>
  <a-tree-select
    v-model="value"
    style="width: 100%"
    :tree-data="treeData"
    tree-checkable
    :treeDefaultExpandAll="true"
    :show-checked-strategy="SHOW_PARENT"
    search-placeholder="Please select"
    @change="onChange"
  />
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT

export default {
	props: {
	   treeDate: Array,
	   treeValue: Array
	},
	watch: {
	  treeDate: function (text) {
	    this.treeData = text
	  },
	  treeValue: function (text) {
		  console.log(text)
	    this.value = text
	  }
	},
  data() {
    return {
      value: [],
      treeData: [
              // { id: 1, pId: 0, value: '1', title: 'Expand to load' },
              // { id: 2, pId: 0, value: '2', title: 'Expand to load' },
              // { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
            ],
      SHOW_PARENT
    }
  },
  methods: {
	  onChange(value, type) {
		// console.log(value);
		this.value = value
		this.$emit('func', this.value)
	  },
	  onSearch() {
		console.log(...arguments)
	  },
	  onSelect() {
		console.log(...arguments)
	  }
  }
}
</script>
