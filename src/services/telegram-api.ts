import qs from 'qs';

export class TelegramApi{
  private tgbot: string;

  constructor() {
    this.tgbot = process.env.NEXT_TELEGRAM_TOKEN as string;
  }

  async sendMessage(props: Record<string, any>) {
    return fetch(
      `https://api.telegram.org/bot${this.tgbot}/sendMessage?${qs.stringify(
        props
      )}`
    )
  }
}