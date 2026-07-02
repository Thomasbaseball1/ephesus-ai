import assert from 'node:assert/strict';
import test from 'node:test';
import { ADMIN_EMAILS, isAdminEmail } from '../src/lib/admin-access';

test('allows configured Ephesus administrators', () => {
  assert.deepEqual(ADMIN_EMAILS, [
    'tmore.haller@yahoo.com',
    'sreid@algobull.ai',
    'deenwest@gmail.com',
  ]);
  assert.equal(isAdminEmail('tmore.haller@yahoo.com'), true);
  assert.equal(isAdminEmail(' TMORE.HALLER@YAHOO.COM '), true);
  assert.equal(isAdminEmail('sreid@algobull.ai'), true);
  assert.equal(isAdminEmail(' DEENWEST@GMAIL.COM '), true);
});

test('rejects all other or missing email addresses', () => {
  assert.equal(isAdminEmail('thaller@algobull.ai'), false);
  assert.equal(isAdminEmail('dashboard-preview@ephesus.local'), false);
  assert.equal(isAdminEmail(undefined), false);
});
