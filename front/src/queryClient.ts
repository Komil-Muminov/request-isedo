// Этот код создает экземпляр QueryClient с настройками по умолчанию для управления запросами к серверу в приложении с помощью библиотеки @tanstack/react-query.
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  // Параметры, передаваемые в defaultOptions, определяют поведение всех запросов, которые будут использовать этот клиент.
  defaultOptions: {
    queries: {
      // Указывает время (в миллисекундах), в течение которого данные считаются "свежими". В данном случае данные будут свежими в течение 5000 миллисекунд (5 секунд). Это значит, что в течение этого времени запросы не будут автоматически перезапрашиваться.
      // staleTime: 5000,
      //   Указывает, должен ли запрос перезапрашиваться при фокусировке окна. Если true, запросы будут перезапрашиваться каждый раз, когда окно приложения становится активным.
      refetchOnWindowFocus: true,
      // Определяет количество попыток повторного запроса в случае ошибки. В данном случае значение 0 означает, что повторных попыток не будет.
      retry: 0,
    },
  },
});
