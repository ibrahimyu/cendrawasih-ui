import { useRef, useState, type FormEvent } from 'react';
import { Avatar, Button, ChoiceGroup, Dialog, Icon, Menu, PageHeader, RadioGroup, Select, Switch, Table, Tabs, TextField, useToast } from '@cendra/ui';
import { Frame } from '../Frame';
import './patterns.css';

const zones = [{ value: 'WIB', label: 'WIB, Jakarta (UTC+7)' }, { value: 'WITA', label: 'WITA, Makassar (UTC+8)' }, { value: 'WIT', label: 'WIT, Jayapura (UTC+9)' }];
interface Member { id: string; name: string; role: string; active: string }
const team: Member[] = [
  { id: 'rina', name: 'Rina Wulandari', role: 'Owner', active: 'Now' },
  { id: 'budi', name: 'Budi Santoso', role: 'Admin', active: '2 hours ago' },
  { id: 'dewi', name: 'Dewi Lestari', role: 'Viewer', active: 'Yesterday' },
];

/** A form that saves on submit: validated on submit, says when there are unsaved changes */
function Workspace() {
  const toast = useToast();
  const saved = useRef({ name: 'Toko Sinar Abadi', zone: 'WIB', missing: 'skip' });
  const [form, setForm] = useState(saved.current);
  const [error, setError] = useState<string>();
  const dirty = JSON.stringify(form) !== JSON.stringify(saved.current);
  const nameInput = useRef<HTMLDivElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Enter the store name your team knows it by');
      nameInput.current?.querySelector('input')?.focus();
      return;
    }
    saved.current = form;
    setError(undefined);
    toast({ tone: 'success', title: 'Workspace saved' });
  }

  return (
    <form className="pt-form" onSubmit={submit} noValidate>
      <div ref={nameInput}>
        <TextField label="Store name" value={form.name} error={error}
          onChange={(e) => { setForm({ ...form, name: e.target.value }); if (error) setError(undefined); }} />
      </div>
      <Select label="Time zone" hint="Sync times and reports use it." options={zones} value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} />
      <RadioGroup legend="When a SKU is missing in Accurate" value={form.missing} onChange={(v) => setForm({ ...form, missing: v })} options={[
        { value: 'skip', label: 'Skip the order and tell me', hint: 'It waits in Failed until you map the SKU.' },
        { value: 'create', label: 'Create the item in Accurate' },
      ]} />
      <div className="pt-form__actions">
        <Button type="submit">Save changes</Button>
        <Button variant="ghost" onClick={() => { setForm(saved.current); setError(undefined); }}>Discard</Button>
        {dirty ? <span className="cx-body-sm pt-soft" role="status">Unsaved changes</span> : null}
      </div>
    </form>
  );
}

/** Settings that apply the moment they flip, each confirmed by a toast */
function Notifications() {
  const toast = useToast();
  const flip = (label: string) => (e: { target: { checked: boolean } }) =>
    toast({ tone: 'success', title: `${label} ${e.target.checked ? 'on' : 'off'}` });
  return (
    <div className="pt-form">
      <ChoiceGroup legend="Tell me when" hint="Changes save at once.">
        <Switch label="A sync fails" hint="On WhatsApp, within a minute." defaultChecked onChange={flip('Failure alerts')} />
        <Switch label="A token is about to expire" hint="By email, 7 days before." defaultChecked onChange={flip('Expiry reminders')} />
        <Switch label="Every morning" hint="A summary by email at 07:00." onChange={flip('Daily summary')} />
      </ChoiceGroup>
    </div>
  );
}

/** A list with row actions. Removing is reversible, so it happens at once with Undo; inviting is a dialog */
function Team() {
  const toast = useToast();
  const [members, setMembers] = useState(team);
  const [inviting, setInviting] = useState(false);
  const invite = useRef<HTMLButtonElement>(null);

  function remove(m: Member) {
    const before = members;
    setMembers(members.filter((x) => x.id !== m.id));
    // The row and its menu button are gone, so focus moves to the next thing you'd use
    requestAnimationFrame(() => invite.current?.focus());
    toast({ title: `${m.name} removed`, action: { label: 'Undo', onClick: () => setMembers(before) } });
  }

  return (
    <div className="pt-stack">
      <div className="pt-row">
        <p className="cx-body-sm pt-soft">{members.length} people can see this workspace.</p>
        <Button ref={invite} size="sm" iconStart={<Icon name="add" size={16} />} onClick={() => setInviting(true)}>Invite</Button>
      </div>
      <Table<Member>
        caption="Team" hideCaption rowKey={(m) => m.id} rows={members}
        columns={[
          { key: 'name', header: 'Name', cell: (m) => <span className="pt-person"><Avatar name={m.name} size="sm" decorative />{m.name}</span> },
          { key: 'role', header: 'Role' },
          { key: 'active', header: 'Last active' },
          { key: 'actions', header: <span className="cx-visually-hidden">Actions</span>, numeric: true, cell: (m) => m.role === 'Owner' ? null : (
            <Menu aria-label={`Actions for ${m.name}`} align="end" items={[
              { id: 'role', label: 'Change role', icon: 'edit' },
              { separator: true },
              { id: 'remove', label: 'Remove from workspace', icon: 'delete', danger: true, onSelect: () => remove(m) },
            ]} trigger={(p) => <Button {...p} size="sm" variant="ghost" aria-label={`Actions for ${m.name}`}><Icon name="more" /></Button>} />
          ) },
        ]}
      />
      <Dialog open={inviting} onClose={() => setInviting(false)} title="Invite a teammate"
        actions={<><Button variant="ghost" onClick={() => setInviting(false)}>Cancel</Button>
          <Button onClick={() => { setInviting(false); toast({ tone: 'success', title: 'Invite sent', body: 'It expires in 7 days.' }); }}>Send invite</Button></>}>
        <TextField label="Email" type="email" placeholder="name@company.com" data-autofocus />
        <Select label="Role" defaultValue="viewer" options={[{ value: 'admin', label: 'Admin: can change settings' }, { value: 'viewer', label: 'Viewer: can see everything' }]} />
      </Dialog>
    </div>
  );
}

const tabs = [{ id: 'workspace', label: 'Workspace' }, { id: 'notifications', label: 'Notifications' }, { id: 'team', label: 'Team', count: 3 }];

export function Settings() {
  const [tab, setTab] = useState('workspace');
  return (
    <Frame page="settings">
      <div className="pt-page">
        <PageHeader eyebrow="Toko Sinar Abadi" title="Settings" />
        <Tabs aria-label="Settings" items={tabs} value={tab} onChange={setTab} panelIds={{ workspace: 'st-workspace', notifications: 'st-notifications', team: 'st-team' }} />
        <div role="tabpanel" id={`st-${tab}`} aria-labelledby={`${tab}-tab`} className="pt-panel pt-panel--form">
          {tab === 'workspace' ? <Workspace /> : tab === 'notifications' ? <Notifications /> : <Team />}
        </div>
      </div>
    </Frame>
  );
}
