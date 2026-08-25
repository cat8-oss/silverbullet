import { Button, Input } from "@silverbulletmd/silverbullet/ui";
import { FieldErrors } from "../../space_fields.tsx";
import type { FieldError } from "../../types.ts";
import type { AdminValues } from "../../wizard.ts";

/**
 * Step 1 of the setup wizard: the administrator account. Fully controlled —
 * the wizard owns the values so stepping back and forth does not lose them,
 * and so it still has the credentials to POST when step 2 finishes.
 */
export function AdminStep({
  values,
  onChange,
  errors,
  busy,
  onSubmit,
}: {
  values: AdminValues;
  onChange: (patch: Partial<AdminValues>) => void;
  errors: FieldError[];
  busy: boolean;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h1>欢迎使用 SilverBullet！</h1>
      <p class="sb-help-text">第 1 步，共 2 步</p>
      <p>
        此服务器尚未配置。只需两步即可完成：先创建管理员账户，然后配置您的第一个空间。之后可在空间管理界面中添加更多空间和用户。
      </p>
      <FieldErrors errors={errors} />
      <label for="setup-username">用户名</label>
      <Input
        id="setup-username"
        value={values.username}
        onInput={(e) => onChange({ username: e.currentTarget.value })}
      />
      <label for="setup-password">密码</label>
      <Input
        id="setup-password"
        type="password"
        value={values.password}
        onInput={(e) => onChange({ password: e.currentTarget.value })}
      />
      <label for="setup-password2">重复密码</label>
      <Input
        id="setup-password2"
        type="password"
        value={values.password2}
        onInput={(e) => onChange({ password2: e.currentTarget.value })}
      />
      <div class="row">
        <Button type="submit" variant="primary" disabled={busy}>
          继续
        </Button>
      </div>
    </form>
  );
}
