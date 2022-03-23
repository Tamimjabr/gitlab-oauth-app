import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridColDef,
} from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: "created_at", headerName: "Created At", width: 250 },
  {
    field: 'author', headerName: "Author", width: 180, valueFormatter: (params: any) => params.value.username
  },
  { field: "action_name", headerName: "Action Name", width: 150 },
  {
    field: 'push_data', headerName: "Commit Title", width: 500, valueFormatter: (params: any) => params.value?.commit_title || ''
  }
];

function CustomToolbar () {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ActivitiesTable ({ rows }) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows} columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}