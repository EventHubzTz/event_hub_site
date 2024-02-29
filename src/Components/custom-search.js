import { Search } from '@mui/icons-material';
import { Card, InputAdornment, OutlinedInput } from '@mui/material';

export const CustomSearch = ({
  handleSearch,
}) => {

  return (
    <Card
      elevation={2}
      sx={{
        p: 2,
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Ingiza Namba ya Simu"
        startAdornment={(
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        )}
        sx={{ maxWidth: 500, mr: "auto" }}
        onChange={(event) => handleSearch && handleSearch(event)}
      />
    </Card>
  );
}
