import { useEditor, useValue } from '@tldraw/editor'

export function useForceSolid() {
	const editor = useEditor()
	return useValue('zoom', () => editor.camera.getZoom() < 0.35, [editor])
}
