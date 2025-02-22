import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const variants = ['h1', 'h2', 'h2', 'h3'];

export default function TypographyDemo() {
 
  return (
    <div>
      {variants.map((variant) => (
        
        <Typography component="div" key={variant} variant={variant}>
          <Box sx={{ width: 300 }}>
          {<Skeleton sx={{width: 400 }} animation='wave'/> }
          </Box>
        </Typography>
        
      ))}
    </div>
  );
}

// TypographyDemo.propTypes = {
//   loading: PropTypes.bool,
// };

// export default function SkeletonTypography() {
//   return (
//     <Grid container spacing={8}>
//       <Grid item xs>
//         <TypographyDemo loading />
//       </Grid>
//       <Grid item xs>
//         <TypographyDemo />
//       </Grid>
//     </Grid>
//   );
// }
