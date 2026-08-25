import { Fragment } from "preact";
import { Button, Input, UrlPrefixInput } from "@silverbulletmd/silverbullet/ui";
import { FolderPicker } from "../../FolderPicker.tsx";
import { FieldErrors } from "../../space_fields.tsx";
import type { FieldError } from "../../types.ts";
import {
  defaultFolder,
  type Hosting,
  parentDir,
  type SpaceValues,
} from "../../wizard.ts";

/**
 * Step 2 of the setup wizard: the first space. Controlled like `AdminStep`,
 * with one wrinkle — `onNameInput` is separate from the other setters because
 * typing a name also reseeds the prefix and folder defaults, which the wizard
 * tracks (see `useSlugDefaults`).
 */
export function SpaceStep({
  values,
  root,
  onNameInput,
  onHostingChange,
  onPrefixChange,
  onFolderChange,
  errors,
  busy,
  onBack,
  onSubmit,
}: {
  values: SpaceValues;
  /** The server's absolute data root, used for the folder placeholder. */
  root: string;
  onNameInput: (name: string) => void;
  onHostingChange: (hosting: Hosting) => void;
  onPrefixChange: (prefix: string) => void;
  onFolderChange: (folder: string) => void;
  errors: FieldError[];
  busy: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h1>创建您的第一个空间</h1>
      <p class="sb-help-text">第 2 步，共 2 步</p>
      <FieldErrors errors={errors} />
      <label for="setup-space-name">名称</label>
      <Input
        id="setup-space-name"
        value={values.name}
        onInput={(e) => onNameInput(e.currentTarget.value)}
      />
      <label>托管方式</label>
      <label>
        <input
          type="radio"
          name="hosting"
          checked={values.hosting === "root"}
          onChange={() => onHostingChange("root")}
        />{" "}
        托管在此服务器的根路径 (/)
        <span class="sb-help-text">
          仅建议在您只创建<em>一个空间</em>，或为其他空间使用独立（子）域名时选择此项。
        </span>
      </label>
      <label>
        <input
          type="radio"
          name="hosting"
          checked={values.hosting === "prefix"}
          onChange={() => onHostingChange("prefix")}
        />{" "}
        托管在 URL 前缀下
      </label>
      {values.hosting === "prefix" && (
        <Fragment>
          <label for="setup-prefix">前缀</label>
          <UrlPrefixInput
            id="setup-prefix"
            origin={location.origin}
            value={values.prefix}
            onInput={onPrefixChange}
          />
        </Fragment>
      )}
      <label for="setup-folder">文件夹</label>
      <FolderPicker
        id="setup-folder"
        value={values.folder}
        onChange={onFolderChange}
        apiBase="/.setup/api"
        placeholder={defaultFolder(root, values.name)}
        browseStart={parentDir(values.folder) || "/"}
      />
      <div class="row">
        <Button onClick={onBack}>返回</Button>
        <Button type="submit" variant="primary" disabled={busy}>
          完成设置
        </Button>
      </div>
    </form>
  );
}
