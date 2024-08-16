import { SQLiteProvider } from 'expo-sqlite';
import { IniciarBD } from './databases/iniciarBD';
import  Index  from './index';

export default function App() {
  return (
    <SQLiteProvider databaseName="meusFilmes.db" onInit={IniciarBD}>
      <Index />
    </SQLiteProvider>
  );
};