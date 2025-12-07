import { useEffect, useState } from "react";
import { RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChecklistSection from "@/components/ChecklistSection";

interface ChecklistItemData {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistData {
  [key: string]: ChecklistItemData[];
}

const INITIAL_DATA: ChecklistData = {
  inspection: [
    {
      id: "insp-1",
      text: "Проверить VIN номер под сиденьем, на шильдике при открытии пассажирской двери и под лобовым стеклом, а также в сервисной книжке",
      completed: false,
    },
    {
      id: "insp-2",
      text: "Проверить надёжность крепления зеркала заднего вида",
      completed: false,
    },
    {
      id: "insp-3",
      text: "Проверить USB порт для видеорегистратора в бардачке",
      completed: false,
    },
    {
      id: "insp-4",
      text: "Проверить работу голосового помощника",
      completed: false,
    },
    {
      id: "insp-5",
      text: "Проверить стабильность работы и подключение к сети Wi-Fi и Bluetooth",
      completed: false,
    },
    {
      id: "insp-6",
      text: "Проверить наличие и РАБОТУ модуля телемматики",
      completed: false,
    },
    {
      id: "insp-7",
      text: "Проверить наличие пластиковой крышки над двигателем",
      completed: false,
    },
    {
      id: "insp-8",
      text: "Напомнить дилеру передать аккаунт новому владельцу и проверить работу приложения телемматики",
      completed: false,
    },
    {
      id: "insp-9",
      text: "Проверить наличие штатного зарядного устройства",
      completed: false,
    },
    {
      id: "insp-10",
      text: "Проверить соответствие номера двигателя в ЭПТС и машине",
      completed: false,
    },
    {
      id: "insp-11",
      text: "Проверить сервисную книжку",
      completed: false,
    },
    {
      id: "insp-12",
      text: "Проверить работу встроенного навигатора и наличие GPS сигнала",
      completed: false,
    },
    {
      id: "insp-13",
      text: "Проверить наличие защитных колпачков на гайках колёс",
      completed: false,
    },
    {
      id: "insp-14",
      text: "Проверить обогрев заднего стекла",
      completed: false,
    },
    {
      id: "insp-15",
      text: "Проверить затянуты ли клеммы на АКБ",
      completed: false,
    },
    {
      id: "insp-16",
      text: "Зарегистрироваться на сайте https://dp.elpts.ru/ и напомнить дилеру отправить заявку на изменение данных в ЭПТС",
      completed: false,
    },
    {
      id: "insp-17",
      text: "Проверить уровень масла в ДВС",
      completed: false,
    },
    {
      id: "insp-18",
      text: "Проверить работу ЭРА Глонасс и связаться с оператором",
      completed: false,
    },
  ],
  issues: [
    {
      id: "issue-1",
      text: "Стук в руль на неровностях (не затянут кардан)",
      completed: false,
    },
    {
      id: "issue-2",
      text: "Биение в руль при скорости свыше 100км/ч (лечится балансировкой колёс)",
      completed: false,
    },
    {
      id: "issue-3",
      text: "Ошибки помощи при спуске и подъеме (сделать сход-развал)",
      completed: false,
    },
    {
      id: "issue-4",
      text: "Руль стоит криво (калибровка руля и сход-развал)",
      completed: false,
    },
    {
      id: "issue-5",
      text: "Не верно отображается наличие топлива в баке после заправки",
      completed: false,
    },
    {
      id: "issue-6",
      text: "Отказ тормозов (воздух в системе, прокачка)",
      completed: false,
    },
    {
      id: "issue-7",
      text: "Зависание ГУ (сброс зажатием кнопок на руле)",
      completed: false,
    },
    {
      id: "issue-8",
      text: "Мигание дисплеев (проверить затяжку клемм АКБ в багажнике)",
      completed: false,
    },
    {
      id: "issue-9",
      text: "При затяжке колеса срываются шпильки (М12×1,25 длина резной части 45мм)",
      completed: false,
    },
    {
      id: "issue-10",
      text: "Течь радиатора (замена по гарантии)",
      completed: false,
    },
    {
      id: "issue-11",
      text: "Моргает нижняя лампочка на зарядном устройстве (fault-ошибка, нет заземления)",
      completed: false,
    },
  ],
};

const STORAGE_KEY = "car-checklist-data";

export default function Home() {
  const [data, setData] = useState<ChecklistData>(INITIAL_DATA);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleToggleItem = (id: string) => {
    setData((prevData) => {
      const newData = { ...prevData };
      for (const section in newData) {
        const item = newData[section].find((item) => item.id === id);
        if (item) {
          item.completed = !item.completed;
          break;
        }
      }
      return newData;
    });
  };

  const handleReset = () => {
    if (confirm("Вы уверены? Все отметки будут очищены.")) {
      setData(INITIAL_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExport = () => {
    const text = generateExportText();
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", "checklist.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateExportText = () => {
    let text = "ЧЕК-ЛИСТ ОСМОТРА АВТОМОБИЛЯ\n";
    text += "============================\n\n";

    text += "ПРОВЕРКИ ПРИ ПОКУПКЕ\n";
    text += "-------------------\n";
    data.inspection.forEach((item, index) => {
      const status = item.completed ? "✓" : "○";
      text += `${status} ${index + 1}. ${item.text}\n`;
    });

    text += "\n\nВОЗМОЖНЫЕ НЕИСПРАВНОСТИ\n";
    text += "------------------------\n";
    data.issues.forEach((item, index) => {
      const status = item.completed ? "✓" : "○";
      text += `${status} ${index + 1}. ${item.text}\n`;
    });

    const totalCompleted =
      data.inspection.filter((i) => i.completed).length +
      data.issues.filter((i) => i.completed).length;
    const totalItems = data.inspection.length + data.issues.length;
    const percentage = Math.round((totalCompleted / totalItems) * 100);

    text += `\n\nОбщий прогресс: ${totalCompleted}/${totalItems} (${percentage}%)\n`;
    text += `Дата: ${new Date().toLocaleString("ru-RU")}\n`;

    return text;
  };

  const totalCompleted =
    data.inspection.filter((i) => i.completed).length +
    data.issues.filter((i) => i.completed).length;
  const totalItems = data.inspection.length + data.issues.length;
  const overallPercentage = Math.round((totalCompleted / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Чек-лист осмотра автомобиля
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Полная проверка перед покупкой и возможные неисправности
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600">
                {overallPercentage}%
              </div>
              <p className="text-sm text-gray-600">
                {totalCompleted} из {totalItems}
              </p>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Inspection Section */}
          <ChecklistSection
            title="Проверки при покупке"
            items={data.inspection}
            onToggleItem={handleToggleItem}
          />

          {/* Issues Section */}
          <ChecklistSection
            title="Возможные неисправности"
            items={data.issues}
            onToggleItem={handleToggleItem}
          />

          {/* Action buttons */}
          <div className="flex gap-3 justify-center pt-4">
            <Button
              onClick={handleExport}
              variant="outline"
              className="gap-2"
              size="lg"
            >
              <Download className="w-4 h-4" />
              Экспортировать
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              size="lg"
            >
              <RotateCcw className="w-4 h-4" />
              Очистить
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Ваш прогресс сохраняется автоматически в браузере</p>
        </div>
      </footer>
    </div>
  );
}
