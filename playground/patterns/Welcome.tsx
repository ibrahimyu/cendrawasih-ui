import { Button, Icon, PageHeader, Progress, Tag } from '@cendra/ui';
import { Frame } from '../Frame';
import './patterns.css';

type StepState = 'done' | 'current' | 'next';
const steps: { title: string; body: string; state: StepState; action?: string }[] = [
  { title: 'Connect your store', body: 'Shopee is connected. Orders from the last 30 days are ready to sync.', state: 'done' },
  { title: 'Connect Accurate', body: 'Sign in to Accurate Online and pick the database your invoices go to.', state: 'current', action: 'Connect Accurate' },
  { title: 'Check the field mapping', body: 'We match order fields to Accurate for you. Check the few we are not sure about.', state: 'next' },
];

/** First run: what is done, the one next step in a toned box, what comes after */
export function Welcome() {
  const done = steps.filter((s) => s.state === 'done').length;
  return (
    <Frame page="welcome">
      <div className="pt-page pt-welcome">
        <PageHeader eyebrow="Toko Sinar Abadi" title="Welcome, Rina">
          Three steps, about ten minutes, and your orders reach Accurate on their own.
        </PageHeader>
        <Progress label="Getting set up" value={done} max={steps.length} valueText={`${done} of ${steps.length} steps done`} />
        <ol className="pt-steps">
          {steps.map((s, i) => (
            <li key={s.title} className={`pt-step pt-step--${s.state}${s.state === 'current' ? ' cx-tone--yellow' : ''}`} aria-current={s.state === 'current' ? 'step' : undefined}>
              <span className="pt-step__mark" aria-hidden>{s.state === 'done' ? <Icon name="check" size={18} /> : i + 1}</span>
              <div className="pt-step__text">
                <div className="pt-step__title">
                  <h2 className="cx-subtitle">{s.title}</h2>
                  {s.state === 'done' ? <Tag tone="green" soft>Done</Tag> : null}
                </div>
                <p className="cx-body-sm pt-soft">{s.body}</p>
                {s.action ? <Button iconEnd={<Icon name="arrow-right" size={18} />}>{s.action}</Button> : null}
              </div>
            </li>
          ))}
        </ol>
        <p className="cx-body-sm pt-soft">Stuck? Your Cendra engineer can do this with you on a call. <a href="#welcome">Book 15 minutes</a></p>
      </div>
    </Frame>
  );
}
