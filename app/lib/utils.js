import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { Box, CircularProgress, Typography } from "@mui/material";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={'5rem'} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary', fontSize: '18px' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}