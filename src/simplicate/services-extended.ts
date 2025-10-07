import { SimplicateClient } from './client';

// ============================================
// Core Interfaces
// ============================================

// Projects
export interface SimplicateProject {
  id: string;
  name: string;
  project_number: string;
  organization?: { id: string; name: string };
  project_manager?: { id: string; name: string };
  start_date?: string;
  end_date?: string;
  budget?: number;
  status?: string;
}

export interface SimplicateProjectService {
  id: string;
  project_id: string;
  name: string;
  price: number;
  amount: number;
}

// CRM
export interface SimplicateOrganization {
  id: string;
  name: string;
  coc_code?: string;
  email?: string;
  phone?: string;
  website?: string;
  relation_type?: string;
  address?: any;
}

export interface SimplicatePerson {
  id: string;
  first_name: string;
  family_name: string;
  email?: string;
  phone?: string;
  organization?: { id: string; name: string };
}

export interface SimplicatePersonCustomField {
  id: string;
  person_id: string;
  name: string;
  value: string;
}

// Sales
export interface SimplicateQuote {
  id: string;
  quote_number: string;
  subject: string;
  organization?: { id: string; name: string };
  status: string;
  total: number;
  created_at: string;
}

export interface SimplicateSale {
  id: string;
  sale_number: string;
  subject: string;
  organization?: { id: string; name: string };
  status: string;
  total: number;
}

// Hours & Timesheets
export interface SimplicateHours {
  id: string;
  employee?: { id: string; name: string };
  project?: { id: string; name: string };
  hours: number;
  start_date: string;
  note?: string;
  status?: string;
}

export interface SimplicateTimesheet {
  id: string;
  employee?: { id: string; name: string };
  start_date: string;
  end_date: string;
  status: string;
}

export interface SimplicateLeave {
  id: string;
  employee?: { id: string; name: string };
  leave_type: string;
  start_date: string;
  end_date: string;
  hours: number;
  status: string;
}

// Invoices & Finance
export interface SimplicateInvoice {
  id: string;
  invoice_number: string;
  organization?: { id: string; name: string };
  date: string;
  total_excluding_vat: number;
  total_including_vat: number;
  status: string;
}

export interface SimplicatePayment {
  id: string;
  invoice_id: string;
  amount: number;
  payment_date: string;
  method: string;
}

export interface SimplicateRevenue {
  id: string;
  project_id: string;
  amount: number;
  date: string;
}

// HRM
export interface SimplicateEmployee {
  id: string;
  name: string;
  email?: string;
  employment_status?: string;
  function?: string;
  hourly_rate?: number;
}

export interface SimplicateAbsence {
  id: string;
  employee?: { id: string; name: string };
  absence_type: string;
  start_date: string;
  end_date: string;
}

// Services
export interface SimplicateService {
  id: string;
  name: string;
  price: number;
  cost_price?: number;
  invoice_method?: string;
}

export interface SimplicateDefaultService {
  id: string;
  default_service_id: string;
  hours_type_id: string;
}

// Tasks & Planning
export interface SimplicateTask {
  id: string;
  title: string;
  description?: string;
  project?: { id: string; name: string };
  assignee?: { id: string; name: string };
  status: string;
  due_date?: string;
}

export interface SimplicateCalendar {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  employee?: { id: string; name: string };
}

// Costs & Mileage
export interface SimplicateCost {
  id: string;
  description: string;
  amount: number;
  project?: { id: string; name: string };
  cost_type: string;
  date: string;
}

export interface SimplicateMileage {
  id: string;
  employee?: { id: string; name: string };
  project?: { id: string; name: string };
  distance: number;
  date: string;
  rate: number;
}

// Documents
export interface SimplicateDocument {
  id: string;
  title: string;
  description?: string;
  document_type: string;
  created_at: string;
  url?: string;
}

// Contracts
export interface SimplicateContract {
  id: string;
  contract_number: string;
  organization?: { id: string; name: string };
  start_date: string;
  end_date?: string;
  status: string;
}

// Custom Fields
export interface SimplicateCustomField {
  id: string;
  name: string;
  type: string;
  model: string;
}

// ============================================
// Extended Simplicate Service
// ============================================

export class SimplicateServiceExtended {
  private client: SimplicateClient;

  constructor() {
    this.client = new SimplicateClient();
  }

  // ============================================
  // PROJECTS MODULE
  // ============================================

  async getProjects(params?: { limit?: number; offset?: number }): Promise<SimplicateProject[]> {
    const response = await this.client.get('/projects/project', params);
    return response.data || [];
  }

  async getProjectById(projectId: string): Promise<SimplicateProject> {
    const response = await this.client.get(`/projects/project/${projectId}`);
    return response.data;
  }

  async createProject(data: Partial<SimplicateProject>): Promise<SimplicateProject> {
    const response = await this.client.post('/projects/project', data);
    return response.data;
  }

  async updateProject(projectId: string, data: Partial<SimplicateProject>): Promise<SimplicateProject> {
    const response = await this.client.put(`/projects/project/${projectId}`, data);
    return response.data;
  }

  async deleteProject(projectId: string): Promise<void> {
    await this.client.delete(`/projects/project/${projectId}`);
  }

  async getProjectServices(projectId: string): Promise<SimplicateProjectService[]> {
    const response = await this.client.get(`/projects/service`, { project_id: projectId });
    return response.data || [];
  }

  // ============================================
  // CRM MODULE
  // ============================================

  async getOrganizations(params?: { limit?: number; offset?: number }): Promise<SimplicateOrganization[]> {
    const response = await this.client.get('/crm/organization', params);
    return response.data || [];
  }

  async getOrganizationById(organizationId: string): Promise<SimplicateOrganization> {
    const response = await this.client.get(`/crm/organization/${organizationId}`);
    return response.data;
  }

  async createOrganization(data: Partial<SimplicateOrganization>): Promise<SimplicateOrganization> {
    const response = await this.client.post('/crm/organization', data);
    return response.data;
  }

  async updateOrganization(organizationId: string, data: Partial<SimplicateOrganization>): Promise<SimplicateOrganization> {
    const response = await this.client.put(`/crm/organization/${organizationId}`, data);
    return response.data;
  }

  async getPersons(params?: { limit?: number; offset?: number }): Promise<SimplicatePerson[]> {
    const response = await this.client.get('/crm/person', params);
    return response.data || [];
  }

  async getPersonById(personId: string): Promise<SimplicatePerson> {
    const response = await this.client.get(`/crm/person/${personId}`);
    return response.data;
  }

  async createPerson(data: Partial<SimplicatePerson>): Promise<SimplicatePerson> {
    const response = await this.client.post('/crm/person', data);
    return response.data;
  }

  async updatePerson(personId: string, data: Partial<SimplicatePerson>): Promise<SimplicatePerson> {
    const response = await this.client.put(`/crm/person/${personId}`, data);
    return response.data;
  }

  // ============================================
  // SALES MODULE
  // ============================================

  async getQuotes(params?: { limit?: number; offset?: number }): Promise<SimplicateQuote[]> {
    const response = await this.client.get('/sales/quote', params);
    return response.data || [];
  }

  async getQuoteById(quoteId: string): Promise<SimplicateQuote> {
    const response = await this.client.get(`/sales/quote/${quoteId}`);
    return response.data;
  }

  async createQuote(data: Partial<SimplicateQuote>): Promise<SimplicateQuote> {
    const response = await this.client.post('/sales/quote', data);
    return response.data;
  }

  async getSales(params?: { limit?: number; offset?: number }): Promise<SimplicateSale[]> {
    const response = await this.client.get('/sales/sale', params);
    return response.data || [];
  }

  async getSaleById(saleId: string): Promise<SimplicateSale> {
    const response = await this.client.get(`/sales/sale/${saleId}`);
    return response.data;
  }

  // ============================================
  // HOURS & TIMESHEETS MODULE
  // ============================================

  async getHours(params?: { limit?: number; offset?: number }): Promise<SimplicateHours[]> {
    const response = await this.client.get('/hours/hours', params);
    return response.data || [];
  }

  async getHoursById(hoursId: string): Promise<SimplicateHours> {
    const response = await this.client.get(`/hours/hours/${hoursId}`);
    return response.data;
  }

  async createHours(data: Partial<SimplicateHours>): Promise<SimplicateHours> {
    const response = await this.client.post('/hours/hours', data);
    return response.data;
  }

  async updateHours(hoursId: string, data: Partial<SimplicateHours>): Promise<SimplicateHours> {
    const response = await this.client.put(`/hours/hours/${hoursId}`, data);
    return response.data;
  }

  async deleteHours(hoursId: string): Promise<void> {
    await this.client.delete(`/hours/hours/${hoursId}`);
  }

  async getTimesheets(params?: { limit?: number; offset?: number }): Promise<SimplicateTimesheet[]> {
    const response = await this.client.get('/hours/timesheet', params);
    return response.data || [];
  }

  async getLeave(params?: { limit?: number; offset?: number }): Promise<SimplicateLeave[]> {
    const response = await this.client.get('/hours/leave', params);
    return response.data || [];
  }

  async createLeave(data: Partial<SimplicateLeave>): Promise<SimplicateLeave> {
    const response = await this.client.post('/hours/leave', data);
    return response.data;
  }

  // ============================================
  // INVOICES & FINANCE MODULE
  // ============================================

  async getInvoices(params?: { limit?: number; offset?: number }): Promise<SimplicateInvoice[]> {
    const response = await this.client.get('/invoices/invoice', params);
    return response.data || [];
  }

  async getInvoiceById(invoiceId: string): Promise<SimplicateInvoice> {
    const response = await this.client.get(`/invoices/invoice/${invoiceId}`);
    return response.data;
  }

  async createInvoice(data: Partial<SimplicateInvoice>): Promise<SimplicateInvoice> {
    const response = await this.client.post('/invoices/invoice', data);
    return response.data;
  }

  async updateInvoice(invoiceId: string, data: Partial<SimplicateInvoice>): Promise<SimplicateInvoice> {
    const response = await this.client.put(`/invoices/invoice/${invoiceId}`, data);
    return response.data;
  }

  async getPayments(params?: { limit?: number; offset?: number }): Promise<SimplicatePayment[]> {
    const response = await this.client.get('/invoices/payment', params);
    return response.data || [];
  }

  async createPayment(data: Partial<SimplicatePayment>): Promise<SimplicatePayment> {
    const response = await this.client.post('/invoices/payment', data);
    return response.data;
  }

  async getRevenue(params?: { limit?: number; offset?: number }): Promise<SimplicateRevenue[]> {
    const response = await this.client.get('/invoices/revenue', params);
    return response.data || [];
  }

  // ============================================
  // HRM MODULE
  // ============================================

  async getEmployees(params?: { limit?: number; offset?: number }): Promise<SimplicateEmployee[]> {
    const response = await this.client.get('/hrm/employee', params);
    return response.data || [];
  }

  async getEmployeeById(employeeId: string): Promise<SimplicateEmployee> {
    const response = await this.client.get(`/hrm/employee/${employeeId}`);
    return response.data;
  }

  async getAbsences(params?: { limit?: number; offset?: number }): Promise<SimplicateAbsence[]> {
    const response = await this.client.get('/hrm/absence', params);
    return response.data || [];
  }

  async createAbsence(data: Partial<SimplicateAbsence>): Promise<SimplicateAbsence> {
    const response = await this.client.post('/hrm/absence', data);
    return response.data;
  }

  // ============================================
  // SERVICES MODULE
  // ============================================

  async getServices(params?: { limit?: number; offset?: number }): Promise<SimplicateService[]> {
    const response = await this.client.get('/services/service', params);
    return response.data || [];
  }

  async getServiceById(serviceId: string): Promise<SimplicateService> {
    const response = await this.client.get(`/services/service/${serviceId}`);
    return response.data;
  }

  async createService(data: Partial<SimplicateService>): Promise<SimplicateService> {
    const response = await this.client.post('/services/service', data);
    return response.data;
  }

  async getDefaultServices(): Promise<SimplicateDefaultService[]> {
    const response = await this.client.get('/services/defaultservice');
    return response.data || [];
  }

  // ============================================
  // TASKS & PLANNING MODULE
  // ============================================

  async getTasks(params?: { limit?: number; offset?: number }): Promise<SimplicateTask[]> {
    const response = await this.client.get('/projects/task', params);
    return response.data || [];
  }

  async getTaskById(taskId: string): Promise<SimplicateTask> {
    const response = await this.client.get(`/projects/task/${taskId}`);
    return response.data;
  }

  async createTask(data: Partial<SimplicateTask>): Promise<SimplicateTask> {
    const response = await this.client.post('/projects/task', data);
    return response.data;
  }

  async updateTask(taskId: string, data: Partial<SimplicateTask>): Promise<SimplicateTask> {
    const response = await this.client.put(`/projects/task/${taskId}`, data);
    return response.data;
  }

  async getCalendarEvents(params?: { limit?: number; offset?: number }): Promise<SimplicateCalendar[]> {
    const response = await this.client.get('/hours/calendar', params);
    return response.data || [];
  }

  // ============================================
  // COSTS & MILEAGE MODULE
  // ============================================

  async getCosts(params?: { limit?: number; offset?: number }): Promise<SimplicateCost[]> {
    const response = await this.client.get('/costs/cost', params);
    return response.data || [];
  }

  async getCostById(costId: string): Promise<SimplicateCost> {
    const response = await this.client.get(`/costs/cost/${costId}`);
    return response.data;
  }

  async createCost(data: Partial<SimplicateCost>): Promise<SimplicateCost> {
    const response = await this.client.post('/costs/cost', data);
    return response.data;
  }

  async getMileage(params?: { limit?: number; offset?: number }): Promise<SimplicateMileage[]> {
    const response = await this.client.get('/costs/mileage', params);
    return response.data || [];
  }

  async createMileage(data: Partial<SimplicateMileage>): Promise<SimplicateMileage> {
    const response = await this.client.post('/costs/mileage', data);
    return response.data;
  }

  // ============================================
  // DOCUMENTS MODULE
  // ============================================

  async getDocuments(params?: { limit?: number; offset?: number }): Promise<SimplicateDocument[]> {
    const response = await this.client.get('/documents/document', params);
    return response.data || [];
  }

  async getDocumentById(documentId: string): Promise<SimplicateDocument> {
    const response = await this.client.get(`/documents/document/${documentId}`);
    return response.data;
  }

  async uploadDocument(data: any): Promise<SimplicateDocument> {
    const response = await this.client.post('/documents/document', data);
    return response.data;
  }

  // ============================================
  // CONTRACTS MODULE
  // ============================================

  async getContracts(params?: { limit?: number; offset?: number }): Promise<SimplicateContract[]> {
    const response = await this.client.get('/crm/contract', params);
    return response.data || [];
  }

  async getContractById(contractId: string): Promise<SimplicateContract> {
    const response = await this.client.get(`/crm/contract/${contractId}`);
    return response.data;
  }

  async createContract(data: Partial<SimplicateContract>): Promise<SimplicateContract> {
    const response = await this.client.post('/crm/contract', data);
    return response.data;
  }

  // ============================================
  // CUSTOM FIELDS MODULE
  // ============================================

  async getCustomFields(model?: string): Promise<SimplicateCustomField[]> {
    const params = model ? { model } : undefined;
    const response = await this.client.get('/customfields/customfield', params);
    return response.data || [];
  }

  // ============================================
  // SEARCH MODULE
  // ============================================

  async search(query: string, type?: 'project' | 'organization' | 'person'): Promise<any[]> {
    const endpoint = type ? `/search/${type}` : '/search';
    const response = await this.client.get(endpoint, { q: query });
    return response.data || [];
  }
}

