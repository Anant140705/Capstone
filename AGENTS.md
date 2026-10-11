<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## App conventions
- Keep shared visual roles in the global CSS token system so all pages respond consistently to theme changes.
- Use one subscribed browser theme preference across controls so header, sidebar, and settings stay synchronized.
- Respect reduced-motion preferences through the root MotionConfig and global CSS so animations remain accessible.
