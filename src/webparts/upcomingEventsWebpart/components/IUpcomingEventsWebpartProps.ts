import { SPHttpClient } from '@microsoft/sp-http';

export interface IUpcomingEventsWebpartProps {
  ListUrl: string;
  DisplayItems: string;
  ObjSPHttpClient: SPHttpClient;
  Title: string;
  Description : string;
}