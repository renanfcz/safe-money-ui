type DeleteModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  textMessage: string;
};

export function DeleteModal({
  isOpen,
  onRequestClose,
  onConfirm,
  textMessage,
}: DeleteModalProps) {
  const handleConfirm = async () => {
    onConfirm();
  };
  return (
    <div>
      <div
        className={`${
          isOpen ? "fixed inset-0 bg-black opacity-50 z-10" : "hidden"
        }`}
      ></div>
      <div
        className={`${
          isOpen
            ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 z-20"
            : "hidden"
        }`}
      >
        <p className="text-lg font-medium mb-8">{textMessage}</p>
        <div className="flex justify-end">
          <button
            className="min-w-[102px] hover:bg-gray-200 text-black border border-black py-2 px-4 rounded mr-2"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button
            className="min-w-[102px] bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            onClick={handleConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
