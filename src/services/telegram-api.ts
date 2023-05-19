import qs from 'qs';

export class TelegramApi{
  private tgbot: string;

  constructor(tgbot: string) {
    this.tgbot = tgbot;
  }

  async sendMessage(props: Record<string, any>) {
    return fetch(
      `https://api.telegram.org/bot${this.tgbot}/sendMessage?${qs.stringify(
        props
      )}`
    )
  }
}