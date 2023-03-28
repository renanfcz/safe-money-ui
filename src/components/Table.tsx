"use client";
import { getAllStatus } from '@/enums/status.enum';
import { Expense } from '@/models/Expense';
import { CATEGORIES } from '@/queries/category.queries';
import { INSERT_EXPENSE, REMOVE_EXPENSE } from '@/queries/expenses.queries';
import { executeMutation, executeQuery, getToken } from '@/services/auth.service';
import { Edit, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DeleteModal } from './DeleteModal';

interface ExpensesProps {
  expenses: Expense[];
}
type Categories = {
  findAllCategories: [
    {
      title: string;
      id: string;
    }
  ];
};

type NewExpense = {
  title: string;
  description: string;
  categoryId: string;
  value: number;
  status: string;
  month: string;
  year: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getStatusStyle(status: string) {
  if (status == "OPEN") {
    return "text-amber-400 font-bold";
  }

  if (status == "PAID") {
    return "text-green-600 font-bold";
  }
}

function getTotal({ expenses }: ExpensesProps) {
  return expenses.reduce((total, expense) => total + expense.value, 0);
}

export function Table({ expenses }: ExpensesProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [newExpense, setNewExpense] = useState<NewExpense>({
    title: "",
    description: "",
    categoryId: "",
    value: 0,
    status: "",
    month: "",
    year: 0,
  });

  const categories = useQuery({
    queryKey: "categories",
    queryFn: (): Promise<Categories> => {
      return executeQuery(CATEGORIES, getToken());
    },
  });

  const handleDelete = (id: string) => {
    setIsOpen(false);
    deleteExpense.mutate(id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const insertExpense = useMutation({
    mutationFn: (expense: NewExpense) => {
      const variables = { data: expense };
      return executeMutation(INSERT_EXPENSE, variables, getToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const deleteExpense = useMutation({
    mutationFn: (id: string) => {
      const variables = { removeExpenseId: id };
      return executeMutation(REMOVE_EXPENSE, variables, getToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const handleInsert = async (expense: NewExpense) => {
    const newExpense = {
      title: expense.title,
      description: expense.description,
      categoryId: expense.categoryId,
      value: parseFloat(expense.value.toString()),
      status: expense.status,
      month: expenses[0]?.month,
      year: expenses[0]?.year,
    };

    await insertExpense.mutate(newExpense);
  };

  function openModal(id: string) {
    setIsOpen(true);
    setIdToDelete(id);
  }

  return (
    <div className="flex flex-col justify-center m-5 rounded shadow bg-white">
      <h1 className="text-black justify-center flex text-lg font-bold my-2">
        {expenses[0]?.month} - {expenses[0]?.year}
      </h1>
      <table className="table-fixed w-full divide-y divide-gray-200">
        <thead className="dark:bg-slate-900">
          <tr>
            <th className="px-4 py-2 uppercase text-left text-xs font-medium text-white">
              Despesa
            </th>
            <th className="px-4 py-2 uppercase text-left text-xs font-medium text-white">
              Descrição
            </th>
            <th className="px-4 py-2 uppercase text-left text-xs font-medium text-white">
              Categoria
            </th>
            <th className="px-4 py-2 uppercase text-left text-xs font-medium text-white">
              Valor
            </th>
            <th className="px-4 py-2 uppercase text-left text-xs font-medium text-white">
              Status
            </th>
            <th className="px-4 py-2 uppercase text-left text-xs font-medium text-white">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 divide-y divide-gray-200">
                {expense.title}
              </td>
              <td className="px-4 py-2 divide-y divide-gray-200">
                {expense.description}
              </td>
              <td className="px-4 py-2 divide-y divide-gray-200">
                {expense.category.title}
              </td>
              <td className="px-4 py-2 divide-y divide-gray-200">
                {formatCurrency(expense.value)}
              </td>
              <td
                className={`px-4 py-2 divide-y divide-gray-200 ${getStatusStyle(
                  expense.status
                )}`}
              >
                {expense.status}
              </td>
              <td className={"px-4 py-2 divide-y divide-gray-200"}>
                <button className="border-none mr-1 text-sky-600">
                  <Edit />
                </button>
                <button
                  onClick={() => openModal(expense.id)}
                  className="border-none text-red-600"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
          <tr className="hover:bg-gray-100">
            <td>
              <input
                type="text"
                name="title"
                placeholder="Despesa"
                className="ml-2 form-input rounded min-w-[80%]"
                value={newExpense.title}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                placeholder="Descrição"
                className="ml-2 form-input rounded min-w-[80%]"
                value={newExpense.description}
                onChange={handleChange}
              />
            </td>
            <td>
              {categories.isLoading ? (
                <p>Carregando...</p>
              ) : (
                <select
                  name="categoryId"
                  className="ml-2 form-select rounded min-w-[80%]"
                  value={newExpense.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  {categories.data?.findAllCategories.map((category) => (
                    <option key={category.title} value={`${category.id}`}>
                      {category.title}
                    </option>
                  ))}
                </select>
              )}
            </td>
            <td>
              <input
                type="number"
                name="value"
                placeholder="Valor"
                className="ml-2 form-input rounded min-w-[80%]"
                value={newExpense.value}
                onChange={handleChange}
              />
            </td>
            <td>
              <select
                name="status"
                className="ml-2 form-select rounded min-w-[80%]"
                value={newExpense.status}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {getAllStatus().map((status) => (
                  <option key={status} value={`${status}`}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-2 ">
              <button
                className="border-none mr-1 text-green-600"
                onClick={() => handleInsert(newExpense)}
              >
                <Save />
              </button>
              <button className="border-none text-red-600">
                <X />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <button className="text-white font-bold mt-1 px-3 py-1 rounded mr-24 bg-sky-500 hover:bg-sky-600">
          Add
        </button>
      </div>

      <div className="flex justify-end px-4 py-2 font-medium">
        <span>Total: {formatCurrency(getTotal({ expenses }))}</span>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirm={()=>handleDelete(idToDelete)}
        textMessage="Deseja realmente excluir essa despesa?"
      />
    </div>
  );
}
