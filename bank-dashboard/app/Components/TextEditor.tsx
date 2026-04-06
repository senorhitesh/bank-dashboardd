"use client";

import { useState, useEffect, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Autoformat,
  TextTransformation,
  LinkImage,
  Link,
  ImageBlock,
  ImageToolbar,
  BlockQuote,
  Bold,
  Bookmark,
  CKBox,
  CloudServices,
  ImageUpload,
  ImageInsert,
  ImageInsertViaUrl,
  AutoImage,
  PictureEditing,
  CKBoxImageEdit,
  TableColumnResize,
  Table,
  TableToolbar,
  Emoji,
  Mention,
  PasteFromOffice,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  Heading,
  Highlight,
  HorizontalLine,
  ImageTextAlternative,
  ImageCaption,
  ImageResize,
  ImageStyle,
  Indent,
  IndentBlock,
  Code,
  ImageInline,
  Italic,
  AutoLink,
  ListProperties,
  List,
  ImageUtils,
  ImageEditing,
  PageBreak,
  RemoveFormat,
  SpecialCharactersArrows,
  SpecialCharacters,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  GeneralHtmlSupport,
  Subscript,
  Superscript,
  TableCaption,
  TableCellProperties,
  TableProperties,
  Alignment,
  TodoList,
  Underline,
  BalloonToolbar,
  type EditorConfig,
} from "ckeditor5";
import {
  CaseChange,
  PasteFromOfficeEnhanced,
  ExportPdf,
  ExportWord,
  Footnotes,
  FormatPainter,
  ImportWord,
  LineHeight,
  MergeFields,
  MultiLevelList,
  SlashCommand,
  TableOfContents,
  Template,
} from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyMTExOTksImp0aSI6IjZjNDE3YTM0LWIyY2YtNDA4OC1hN2ZhLWE0MmFmZTAzMzM0ZSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjU0NGNlYmY4In0.a-QYMgkRPJ_tZgoLx9NKowzM6UPjbX5vPkq6USIyPhbgS9yxAwqTsNdKyyLatb9xxPCQ6I9dmz0dW90e37D1Tg";

const CLOUD_SERVICES_TOKEN_URL =
  "https://rw205cqxhxvk.cke-cs.com/token/dev/ef17e8304c90ca9512b54bc04017616508868446d5246da7384ce4bc691b?limit=10";

export default function App({
  data,
  onChange,
}: {
  data: string;
  onChange: (data: string) => void;
}) {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig: EditorConfig | null = useMemo(() => {
    if (!isLayoutReady) {
      return null;
    }

    return {
      root: {
        placeholder: "Type or paste your content here!",
        initialData: data,
      },
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "insertMergeField",
          "previewMergeFields",
          "|",
          "formatPainter",
          "|",
          "heading",
          "style",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "link",
          "insertImage",
          "insertTable",
          "highlight",
          "blockQuote",
          "|",
          "alignment",
          "lineHeight",
          "|",
          "bulletedList",
          "numberedList",
          "multiLevelList",
          "todoList",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        Bookmark,
        CaseChange,
        CKBox,
        CKBoxImageEdit,
        CloudServices,
        Code,
        Emoji,
        Essentials,
        ExportPdf,
        ExportWord,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Footnotes,
        FormatPainter,
        Fullscreen,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        ImageBlock,
        ImageCaption,
        ImageEditing,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        ImageUtils,
        ImportWord,
        Indent,
        IndentBlock,
        Italic,
        LineHeight,
        Link,
        LinkImage,
        List,
        ListProperties,
        Mention,
        MergeFields,
        MultiLevelList,
        PageBreak,
        Paragraph,
        PasteFromOffice,
        PasteFromOfficeEnhanced,
        PictureEditing,
        RemoveFormat,
        SlashCommand,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableOfContents,
        TableProperties,
        TableToolbar,
        Template,
        TextTransformation,
        TodoList,
        Underline,
      ],
      licenseKey: LICENSE_KEY,
      balloonToolbar: [
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "|",
        "bulletedList",
        "numberedList",
      ],
      cloudServices: {
        tokenUrl: CLOUD_SERVICES_TOKEN_URL,
      },
      exportPdf: {
        stylesheets: [
          "./export-style.css",
          "https://cdn.ckeditor.com/ckeditor5/48.0.0/ckeditor5.css",
          "https://cdn.ckeditor.com/ckeditor5-premium-features/48.0.0/ckeditor5-premium-features.css",
        ],
        fileName: "export-pdf-demo.pdf",
        converterOptions: {
          document: {
            size: "Tabloid",
            orientation: "portrait",
            margins: {
              top: "20mm",
              bottom: "20mm",
              right: "24mm",
              left: "24mm",
            },
          },
        },
      },
      exportWord: {
        stylesheets: [
          "./export-style.css",
          "https://cdn.ckeditor.com/ckeditor5/48.0.0/ckeditor5.css",
          "https://cdn.ckeditor.com/ckeditor5-premium-features/48.0.0/ckeditor5-premium-features.css",
        ],
        fileName: "export-word-demo.docx",
        converterOptions: {
          document: {
            orientation: "portrait",
            size: "Tabloid",
            margins: {
              top: "20mm",
              bottom: "20mm",
              right: "24mm",
              left: "24mm",
            },
          },
        },
      },
      fontFamily: { supportAllValues: true },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },
      fullscreen: {
        onEnterCallback: (container: HTMLElement) =>
          container.classList.add(
            "editor-container",
            "editor-container_classic-editor",
            "editor-container_include-style",
            "editor-container_include-fullscreen",
            "main-container",
          ),
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      htmlSupport: {
        allow: [
          { name: /^.*$/, styles: true, attributes: true, classes: true },
        ],
      },
      image: {
        toolbar: [
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:wrapText",
          "imageStyle:breakText",
          "|",
          "resizeImage",
          "|",
          "ckboxImageEdit",
        ],
      },
      lineHeight: { supportAllValues: true },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: { download: "file" },
          },
        },
      },
      list: {
        properties: { styles: true, startIndex: true, reversed: true },
      },
      mention: {
        feeds: [{ marker: "@", feed: [] }],
      },
      menuBar: { isVisible: true },
      style: {
        definitions: [
          { name: "Article category", element: "h3", classes: ["category"] },
          { name: "Title", element: "h2", classes: ["document-title"] },
          { name: "Subtitle", element: "h3", classes: ["document-subtitle"] },
          { name: "Info box", element: "p", classes: ["info-box"] },
          {
            name: "CTA Link Primary",
            element: "a",
            classes: ["button", "button--green"],
          },
          {
            name: "CTA Link Secondary",
            element: "a",
            classes: ["button", "button--black"],
          },
          { name: "Marker", element: "span", classes: ["marker"] },
          { name: "Spoiler", element: "span", classes: ["spoiler"] },
        ],
      },
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties",
        ],
      },
      template: {
        definitions: [
          {
            title: "Introduction",
            description: "Simple introduction to an article",
            icon: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="45" fill="#A5E7EB"/></svg>',
            data: "<h2>Introduction</h2><p>Content goes here...</p>",
          },
        ],
      },
    };
  }, [isLayoutReady, data]);

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-fullscreen">
        <div className="editor-container__editor">
          {editorConfig && (
            <CKEditor
              editor={ClassicEditor}
              data={data}
              onChange={(event, editor) => {
                const content = editor.getData();
                onChange(content);
              }}
              config={editorConfig}
            />
          )}
        </div>
      </div>
    </div>
  );
}
