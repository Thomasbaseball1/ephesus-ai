import assert from 'node:assert/strict';
import test from 'node:test';
import { ADMIN_EMAIL, isAdminEmail } from '../src/lib/admin-access';

test('allows only the configured Ephesus administrator', () => {
  assert.equal(ADMIN_EMAIL, 'tmore.haller@yahoo.com');
  assert.equal(isAdminEmail('tmore.haller@yahoo.com'), true);
  assert.equal(isAdminEmail(' TMORE.HALLER@YAHOO.COM '), true);
});

test('rejects all other or missing email addresses', () => {
  assert.equal(isAdminEmail('thaller@algobull.ai'), false);
  assert.equal(isAdminEmail('sreid@algobull.ai'), false);
  assert.equal(isAdminEmail('deenwest@gmail.com'), false);
  assert.equal(isAdminEmail('dashboard-preview@ephesus.local'), false);
  assert.equal(isAdminEmail(undefined), false);
});
