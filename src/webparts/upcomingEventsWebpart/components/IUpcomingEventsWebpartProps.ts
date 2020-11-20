import { SPHttpClient } from '@microsoft/sp-http';

export interface IUpcomingEventsWebpartProps {
  ListUrl: string;
  DisplayItems: string;
  spHttpClient: SPHttpClient;
  Title: string;
  Description : string;
}