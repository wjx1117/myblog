<template>
  <div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 400px; overflow-y: hidden"
        :defaultConfig="editorConfig"
        v-model="valueHtml"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name : 'RichTextEditor',
  components: { Editor, Toolbar },
  props : {
    modelValue : {
      type : String,
      default : ''
    },
  },
  data () {
    return {
      editor: null,
      valueHtml : '',
      initFinished : false,
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
        excludeKeys : [
          'uploadVideo'
        ]
      },
      editorConfig: {
        placeholder: "请输入内容...",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage : {
            // 上传图片   完整的服务端地址
            server: this.$store.state.serve_url + '/upload/rich_editor_upload',
            //  小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 5 * 1024 // 5kb
          },
          insertImage : {
            parseImageSrc:(src) => {
              if(src.indexOf('http') !== 0 ){
                return `${this.$store.state.serve_url}${src}`
              } 
              return src
            }
          }
        },
      },
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      // console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
      // console.log(this.valueHtml);
      if(this.initFinished) {
        this.$emit('updateValue',this.valueHtml)
        this.$emit('updateV',this.valueHtml)
        // console.log(this.valueHtml);
      }
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
  mounted() {
    // setTimeout(() => {
    //   this.valueHtml = this.modelValue
    //   console.log(this.modelValue);
    //   this.initFinished = true
    // }, 10)
    this.$nextTick(() => {
      this.valueHtml = this.modelValue
      this.initFinished = true
    })
  }
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>