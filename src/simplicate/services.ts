// include .js so runtime ESM import resolves after tsc emit
import { SimplicateClient } from './client.js';

export interface SimplicateProject {
  id: string;
  name: string;
  project_number: string;
  organization?: {
    id: string;
    name: string;
  };
  project_manager?: {
    id: string;
    name: string;
  };
  start_date?: string;
  end_date?: string;
  budget?: number;
  status?: string;
}

export interface SimplicateOrganization {
  id: string;
  name: string;
  coc_code?: string;
  email?: string;
  phone?: string;
  website?: string;
  relation_type?: string;
}

export interface SimplicatePerson {
  id: string;
  first_name: string;
  family_name: string;
  email?: string;
  phone?: string;
  organization?: {
    id: string;
    name: string;
  };
}

export interface SimplicateHours {
  id: string;
  employee?: {
    id: string;
    name: string;
  };
  project?: {
    id: string;
    name: string;
  };
  hours: number;
  start_date: string;
  note?: string;
}

export interface SimplicateInvoice {
  id: string;
  invoice_number: string;
  organization?: {
    id: string;
    name: string;
  };
  date: string;
  total_excluding_vat: number;
  total_including_vat: number;
  status: string;
}

export class SimplicateService {
  private client: SimplicateClient;

  constructor() {
    this.client = new SimplicateClient();
  }

  // Projects
  async getProjects(params?: { limit?: number; offset?: number }): Promise<SimplicateProject[]> {
    const response = await this.client.get('/projects/project', params);
    return response.data || [];
  }

  async getProjectById(projectId: string): Promise<SimplicateProject> {
    const response = await this.client.get(`/projects/project/${projectId}`);
    return response.data;
  }

  // Organizations (CRM)
  async getOrganizations(params?: { limit?: number; offset?: number }): Promise<SimplicateOrganization[]> {
    const response = await this.client.get('/crm/organization', params);
    return response.data || [];
  }

  async getOrganizationById(organizationId: string): Promise<SimplicateOrganization> {
    const response = await this.client.get(`/crm/organization/${organizationId}`);
    return response.data;
  }

  // Persons (Contacts)
  async getPersons(params?: { limit?: number; offset?: number }): Promise<SimplicatePerson[]> {
    const response = await this.client.get('/crm/person', params);
    return response.data || [];
  }

  async getPersonById(personId: string): Promise<SimplicatePerson> {
    const response = await this.client.get(`/crm/person/${personId}`);
    return response.data;
  }

  // Hours (Timesheets)
  async getHours(params?: { limit?: number; offset?: number }): Promise<SimplicateHours[]> {
    const response = await this.client.get('/hours/hours', params);
    return response.data || [];
  }

  async getHoursById(hoursId: string): Promise<SimplicateHours> {
    const response = await this.client.get(`/hours/hours/${hoursId}`);
    return response.data;
  }

  // Invoices
  async getInvoices(params?: { limit?: number; offset?: number }): Promise<SimplicateInvoice[]> {
    const response = await this.client.get('/invoices/invoice', params);
    return response.data || [];
  }

  async getInvoiceById(invoiceId: string): Promise<SimplicateInvoice> {
    const response = await this.client.get(`/invoices/invoice/${invoiceId}`);
    return response.data;
  }

  // Search across resources
  async search(query: string, type?: 'project' | 'organization' | 'person'): Promise<any[]> {
    const endpoint = type ? `/search/${type}` : '/search';
    const response = await this.client.get(endpoint, { q: query });
    return response.data || [];
  }
}

