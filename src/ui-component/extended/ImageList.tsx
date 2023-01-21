import { ImageListItem, ImageListItemBar } from '@mui/material';
import MImageList from '@mui/material/ImageList';

import useConfig from 'src/hooks/useConfig';
import { PostImage } from 'src/types/user-profile';

// set image width & height radio
function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
	return `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format 1x,
  ${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`;
}

// ==============================|| IMAGE LIST/GRID ||============================== //

interface ImageListProps {
	itemData: PostImage[];
}

const ImageList = ({ itemData }: ImageListProps) => {
	const { borderRadius } = useConfig();

	return (
		<MImageList
			sx={{
				// Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
				transform: 'translateZ(0)',
				overflowY: 'visible',
				mb: 0
			}}
			gap={8}
		>
			{itemData.map((item) => {
				const cols = item.featured ? 2 : 1;
				const rows = item.featured ? 2 : 1;

				return (
					<ImageListItem key={item.img} cols={cols} rows={rows} sx={{ overflow: 'hidden', borderRadius: `${borderRadius}px` }}>
						<img srcSet={srcset(item.img, 250, 200, rows, cols)} alt={item.title} loading="lazy" />
						<ImageListItemBar
							sx={{
								background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
							}}
							title={item.title}
							position="top"
							actionPosition="left"
						/>
					</ImageListItem>
				);
			})}
		</MImageList>
	);
};

export default ImageList;
