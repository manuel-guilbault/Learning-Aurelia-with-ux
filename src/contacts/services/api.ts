import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Contact } from 'contacts/models/contact';

@autoinject()
export class ContactApi {

  constructor(private readonly httpClient: HttpClient) {}

  public async getAll() {
    const response = await this.httpClient.fetch('contacts');
    const dto = await response.json();
    const contacts = dto.map(Contact.fromObject);
    return contacts;
  }

  public async getById(id: number) {
    const response = await this.httpClient.fetch(`contacts/${id}`);
    if (response.status === 404) {
      return null;
    }

    const dto = await response.json();
    const contact = Contact.fromObject(dto);
    return contact;
  }

  public async create(contact: Contact) {
    await this.httpClient.fetch('contacts', { method: 'POST', body: json(contact) });
  }

  public async update(contact: Contact) {
    await this.httpClient.fetch(`contacts/${contact.id}`, { method: 'PUT', body: json(contact) });
  }

  public async updatePhoto(id: number, file: Blob) {
    await this.httpClient.fetch(`contacts/${id}/photo`, { 
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });
  }

  public async delete(id: number) {
    await this.httpClient.fetch(`contacts/${id}`, { method: 'DELETE' });
  }
}
