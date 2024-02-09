import { withProps } from '@udecode/cn';
import { createPlugins, Plate, PlateLeaf } from '@udecode/plate-common';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX } from '@udecode/plate-code-block';
import { createImagePlugin, ELEMENT_IMAGE } from '@udecode/plate-media';
import { createCaptionPlugin } from '@udecode/plate-caption';
import { createBoldPlugin, MARK_BOLD, createItalicPlugin, MARK_ITALIC, createUnderlinePlugin, MARK_UNDERLINE, createStrikethroughPlugin, MARK_STRIKETHROUGH, createCodePlugin, MARK_CODE, createSubscriptPlugin, MARK_SUBSCRIPT, createSuperscriptPlugin, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { createFontSizePlugin } from '@udecode/plate-font';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { createNormalizeTypesPlugin } from '@udecode/plate-normalizers';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { createJuicePlugin } from '@udecode/plate-juice';
import { autoformatMarks } from '@/components/plate-ui/autoformat/autoformat-marks';
import { autoformatBlocks } from '@/components/plate-ui/autoformat/autoformat-blocks';
import { autoformatIndentLists } from '@/components/plate-ui/autoformat/autoformat-indent-lists';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { ImageElement } from '@/components/plate-ui/image-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { TooltipProvider } from '@/components/plate-ui/tooltip';

const plugins = createPlugins(
    [
        createParagraphPlugin(),
        createHeadingPlugin(),
        createCodeBlockPlugin(),
        createImagePlugin(),
        createCaptionPlugin({
            options: {
                pluginKeys: [
                    // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
                ]
            },
        }),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
        createSubscriptPlugin(),
        createSuperscriptPlugin(),
        createFontSizePlugin(),
        createTrailingBlockPlugin(),
        createAlignPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                    ],
                },
            },
        }),
        createIndentPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createIndentListPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createAutoformatPlugin({
            options: {
                rules: [
                    ...autoformatMarks,
                    ...autoformatBlocks,
                    ...autoformatIndentLists
                ],
                enableUndoOnDelete: true,
            },
        }),
        createNodeIdPlugin(),
        createNormalizeTypesPlugin(),
        createDeserializeDocxPlugin(),
        createDeserializeCsvPlugin(),
        createDeserializeMdPlugin(),
        createJuicePlugin(),
    ],
    {
        components: withPlaceholders({
            [ELEMENT_CODE_BLOCK]: CodeBlockElement,
            [ELEMENT_CODE_LINE]: CodeLineElement,
            [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
            [ELEMENT_IMAGE]: ImageElement,
            [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
            [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
            [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
            [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
            [ELEMENT_PARAGRAPH]: ParagraphElement,
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_CODE]: CodeLeaf,
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
            [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
        }),
    }
);

export function TextEditor({initialValue, editorRef}) {

    return (
        <div className="relative border rounded-md h-full">
            <TooltipProvider>
                <Plate editorRef={editorRef} plugins={plugins} initialValue={initialValue} normalizeInitialValue>
                    <FixedToolbar>
                        <FixedToolbarButtons />
                    </FixedToolbar>
                    <div className="flex w-full">
                        <Editor className="border-0 max-h-[380px]" />
                    </div>
                    {/* <FloatingToolbar>
                        <FloatingToolbarButtons />
                    </FloatingToolbar> */}
                </Plate>
            </TooltipProvider>
        </div>
    );
}


