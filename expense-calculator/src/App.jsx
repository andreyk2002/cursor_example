import { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box,
  IconButton,
  ThemeProvider,
  createTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Create a custom theme with better contrast
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    h4: {
      color: '#1976d2',
      fontWeight: 600,
    },
    h6: {
      color: '#333333',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f7ff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#1976d2',
        },
      },
    },
  },
});

function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
  const [results, setResults] = useState(null);

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, { 
        category: newExpense.category, 
        amount: parseFloat(newExpense.amount) 
      }]);
      setNewExpense({ category: '', amount: '' });
    }
  };

  const handleDeleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const calculateResults = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const average = total / 30;
    const top3 = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    setResults({
      total,
      average,
      top3
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Expense Calculator
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Expense
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Amount ($)"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              fullWidth
              variant="outlined"
            />
            <IconButton 
              color="primary" 
              onClick={handleAddExpense}
              sx={{ height: 56, backgroundColor: theme.palette.primary.main, color: 'white' }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount ($)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell align="right">${expense.amount.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteExpense(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button 
            variant="contained" 
            onClick={calculateResults}
            disabled={expenses.length === 0}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#1565c0',
              }
            }}
          >
            Calculate
          </Button>
        </Box>

        {results && (
          <Paper sx={{ p: 3, backgroundColor: '#f0f7ff' }}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Results
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Total amount of expenses: <strong>${results.total.toLocaleString()}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Average daily expense: <strong>${results.average.toLocaleString()}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Top 3 expenses:
            </Typography>
            <ul style={{ marginTop: 0 }}>
              {results.top3.map((expense, index) => (
                <li key={index}>
                  <strong>{expense.category}</strong> (${expense.amount.toLocaleString()})
                </li>
              ))}
            </ul>
          </Paper>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
