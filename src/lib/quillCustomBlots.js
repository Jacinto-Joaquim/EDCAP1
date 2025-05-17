
    import { Quill } from 'react-quill';

    const BlockEmbed = Quill.import('blots/block/embed');

    class VideoBlot extends BlockEmbed {
      static create(url) {
        let node = super.create();
        node.setAttribute('src', url);
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', true);
        node.setAttribute('width', '100%'); 
        node.setAttribute('height', '450'); 
        return node;
      }

      static value(node) {
        return node.getAttribute('src');
      }
    }
    VideoBlot.blotName = 'video';
    VideoBlot.tagName = 'iframe';


    class ImageBlot extends BlockEmbed {
      static create(value) {
        const node = super.create();
        if (typeof value === 'string') {
          node.setAttribute('src', value);
        } else {
          node.setAttribute('src', value.src);
          if (value.alt) node.setAttribute('alt', value.alt);
          if (value.width) node.setAttribute('width', value.width);
          if (value.height) node.setAttribute('height', value.height);
          if (value.style) node.setAttribute('style', value.style);
        }
        return node;
      }

      static value(node) {
        return {
          src: node.getAttribute('src'),
          alt: node.getAttribute('alt'),
          width: node.getAttribute('width'),
          height: node.getAttribute('height'),
          style: node.getAttribute('style'),
        };
      }
    }
    ImageBlot.blotName = 'image';
    ImageBlot.tagName = 'img';

    export { VideoBlot, ImageBlot };
  