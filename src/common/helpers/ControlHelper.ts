import { IDatePickerStrings } from "@fluentui/react";
import * as moment from "moment";


export class ControlHelper {

    public static onFormatDate = (date: Date): string => {
    return moment(date).format('DD/MM/YYYY');
  };
  
  public static onFormatDateTime = (date: string): string => {
    return moment(date).format('DD/MM/YY HH:mm');
  };
  
  public static DayPickerStrings: IDatePickerStrings = {
  
    shortMonths: [
        "En",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      days: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      shortDays: ["D", "L", "M", "X", "J", "V", "S"],
      goToToday: "Ir a hoy",
      prevMonthAriaLabel: "Ir a mes anterior",
      nextMonthAriaLabel: "Ir a mes siguiente",
      prevYearAriaLabel: "Ir a año anterior",
      nextYearAriaLabel: "Ir a año previo",
      closeButtonAriaLabel: "Cerrar calendario",

  }

}